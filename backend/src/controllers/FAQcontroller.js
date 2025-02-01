import FAQService from "../services/FAQservices.js";

const faqService = new FAQService();

export const createFaq = async (req, res) => {
    try {
        const { question, answer, answerHtml, languages } = req.body;
        const faq = await faqService.create_FAQ({ question, answer, answerHtml, languages });
        return res.status(201).json({
            data: faq,
            message: 'successfully created faq',
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: 'something went wrong',
            success: false,
            err: error
        });
    }
};

export const getFaqs = async (req, res) => {
    try {
        const { faqs, availableLanguages } = await faqService.get_FAQs();

        return res.status(200).json({
            data: { faqs, availableLanguages },
            message: 'Successfully fetched FAQs',
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: 'Something went wrong',
            success: false,
            err: error
        });
    }
};



export const deleteFaq = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await faqService.delete_FAQ(id);
        return res.status(200).json({
            data: result,
            message: 'successfully deleted faq',
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: 'something went wrong',
            success: false,
            err: error
        });
    }
};


