//Depiction of Test, How test is written in the codebase

import { expect, jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';
import mongoose from 'mongoose';
import { DB_URL } from '../src/config/serverConfig.js';
import redis from '../src/config/redis-config.js';

jest.mock('translate-google');

describe('FAQ API Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(DB_URL);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await new Promise(resolve => redis.quit(() => resolve()));
    });

    describe('POST /api/v1/faq', () => {
        it('should handle translation errors', async () => {
            const newFAQ = {
                question: 'What is the meaning of life?',
                answer: 'meaning of life is nothing',
                answerHtml: '<p>meaning of life is nothing</p>',
                languages: ['hi'],
            };

            require('translate-google').mockImplementation(async (text, options) => {
                if (options.to === 'hi') {
                    return `Mock translation of ${text} to ${options.to}`;
                } else {
                    throw new Error("Mock translation error");
                }
            });

            const response = await request(app)
              .post('/api/v1/faq')
              .send(newFAQ)
              .expect(201);

            expect(response.body.success).toBe(true);
        });
    });
});