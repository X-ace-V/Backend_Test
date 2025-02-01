import FAQRepo from "../repositories/FAQrepo.js";
import translate from "translate-google";
import { extractTextFromHTML } from "../utils/htmlUtils.js"; 

class FAQService {
    constructor() {
        this.faqRepo = new FAQRepo();
    }

    async create_FAQ(data) {
        try {
            const { question, answer, answerHtml, languages } = data;

            // Extract plain text from HTML for the answer
            const answerText = extractTextFromHTML(answerHtml || ""); // Convert HTML answer to text

            const translations = [];

            // Translate using translate-google
            const translatePromises = languages.map(async (lang) => {
                try {
                    const translatedQuestion = await translate(question, { to: lang });
                    const translatedAnswer = await translate(answerText, { to: lang });
                    const translatedAnswerHtml = answerHtml
                      ? await translate(answerHtml, { to: lang })
                      : "";

                    return {
                        question: translatedQuestion,
                        answer: translatedAnswer,
                        answerHtml: translatedAnswerHtml,
                    };
                } catch (error) {
                    console.error(`Translation to ${lang} failed:`, error);
                    return null;
                }
            });

            const translatedResults = await Promise.all(translatePromises);
            translations.push(...translatedResults);

            const faq = await this.faqRepo.create_Faq({
                question,
                answer: answerText, // Store plain text answer
                answerHtml, // Store original HTML answer
                translations,
            });

            await this.faqRepo.clearCache();
            return faq;
        } catch (error) {
            console.error("Error in service Layer (create_FAQ):", error);
            throw error;
        }
    }

    async get_FAQs() {
        try {
            const faqs = await this.faqRepo.getAllFAQs();
            const allLangs = new Set(['en']);
    
            const translatedFAQs = faqs.map(faq => {
                const translations = {};
                for (const lang in faq.translations) {
                    allLangs.add(lang);
                    translations[lang] = faq.translations[lang];
                }
                if (!translations['en']) {
                    translations['en'] = {
                        question: faq.question,
                        answer: faq.answer,
                        answerHtml: faq.answerHtml
                    };
                }
                return {
                  ...faq.toObject(),
                    translations
                };
            });
    
            return {
                faqs: translatedFAQs,
                availableLanguages: Array.from(allLangs)
            };
        } catch (error) {
            console.error("Error in service Layer (get_FAQs):", error);
            throw error;
        }
    }
    
    async delete_FAQ(id) {
        try {
            await this.faqRepo.delete_FAQ(id);
            await this.faqRepo.clearCache();
            return { message: "FAQ deleted successfully" };
        } catch (error) {
            console.error('Error in service Layer (delete_FAQ):', error);
            throw error;
        }
    }

}

export default FAQService;