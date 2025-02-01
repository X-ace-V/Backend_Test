import FAQ from "../models/FAQ.js";
import Redis from "ioredis";

const redis  = new Redis();


class FAQRepo {
    async create_Faq(data) {
        try {
            const faq = await FAQ.create(data);
            return faq;
        } catch (error) {
            console.log('Error While Creating in Repo');
            throw { error };
        }
    }

    async cachedFAQs(lang, faqs) {
        try {
            await redis.set(`faqs_${lang}`, JSON.stringify(faqs), 'EX', 3600);
        } catch (error) {
            console.log('Error While caching in Repo');
            throw { error };
        }
    }

    async getCachedFAQs(lang) {
        try {
            const cachedFAQs = await redis.get(`faqs_${lang}`);
            return JSON.parse(cachedFAQs);
        } catch (error) {
            console.log('Error While fetching cached FAQs in Repo');
            throw { error };
        }
    }

    async clearCache() {
        try {
            const keys = await redis.keys('faqs_*');
            if (keys.length > 0) {
                await redis.del(...keys);
            }
        } catch (error) {
            console.log('Error While clearing cache in Repo');
            throw { error };
        }
    }

    async getAllFAQs() {
        try {
            return await FAQ.find({});
        } catch (error) {
            console.error('Error while fetching FAQs in Repo');
            throw error;
        }
    }

    async delete_FAQ(id) {
        try {
            const result = await FAQ.deleteOne({ _id: id }); 
            return result; 
        } catch (error) {
            console.error('Error while deleting FAQ in Repo');
            throw error;
        }
    }
    
}

export default FAQRepo;