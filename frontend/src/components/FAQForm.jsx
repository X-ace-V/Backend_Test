import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FAQForm = ({ fetchFAQs }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [languages, setLanguages] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { 
                question, 
                answerHtml: answer, 
                languages: languages.split(',').map(lang => lang.trim()) 
            };
            await axios.post('http://localhost:3000/api/v1/faq', payload);
            setResponseMessage('FAQ added successfully!');
            setQuestion('');
            setAnswer('');
            setLanguages('');
            fetchFAQs();
        } catch (error) {
            setResponseMessage('Failed to add FAQ');
        }
    };

    return (
        <div className="faq-form">
            <h2>Submit FAQ</h2>
            <form onSubmit={handleSubmit} className="faq-form__input-group">
                <label>
                    <strong>Question:</strong>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="faq-form__input"
                    />
                </label>

                <label>
                    <strong>Answer:</strong>
                    <ReactQuill value={answer} onChange={setAnswer} className="faq-form__quill" />
                </label>

                <label>
                    <strong>Languages (comma-separated):</strong>
                    <input
                        type="text"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        className="faq-form__input"
                        placeholder="e.g., en, es, fr"
                    />
                </label>

                <button type="submit" className="faq-form__button">Submit FAQ</button>
            </form>

            {responseMessage && <div className={responseMessage.includes('Failed') ? 'error' : 'success'}>{responseMessage}</div>}
        </div>
    );
};

export default FAQForm;
