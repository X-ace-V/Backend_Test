import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQList = ({ fetchFAQs }) => {
    const [faqs, setFaqs] = useState([]);

    const fetchFAQsData = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/v1/faqs');
            setFaqs(data.data.faqs);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const handleDelete = async (faqId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/admin/faq/${faqId}`);
            setFaqs(faqs.filter(faq => faq._id !== faqId));
            alert('FAQ deleted successfully!');
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            alert('Failed to delete FAQ.');
        }
    };

    useEffect(() => {
        fetchFAQsData();
    }, []);

    return (
        <div className="faq-list">
            <h2>All FAQs</h2>
            {faqs.length === 0 ? (
                <p>No FAQs available yet.</p>
            ) : (
                <div className="faq-list__items">
                    {faqs.map((faq) => (
                        <div key={faq._id} className="faq-list__item">
                            <h3>{faq.question}</h3>
                            <p><strong>Answer:</strong></p>
                            <div dangerouslySetInnerHTML={{ __html: faq.answerHtml }}></div>
                            <div>
                                <strong>Translations:</strong>
                                {faq.translations &&
                                    Object.keys(faq.translations).map((lang) => (
                                        <div key={lang}>
                                            <p><strong>{lang.toUpperCase()}:</strong></p>
                                            <p><b>Question:</b> {faq.translations[lang].question}</p>
                                            <p><b>Answer:</b> {faq.translations[lang].answer}</p>
                                        </div>
                                    ))}
                            </div>
                            <button onClick={() => handleDelete(faq._id)} className="delete-button">
                                Delete FAQ
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FAQList;
