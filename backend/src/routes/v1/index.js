import express from 'express';
import { createFaq, getFaqs, deleteFaq } from '../../controllers/FAQcontroller.js';

const router = express.Router();

router.post('/faq', createFaq);
router.get('/faqs', getFaqs);
router.delete('/admin/faq/:id', deleteFaq);

export default router;