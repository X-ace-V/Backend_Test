import React, { useEffect, useState } from 'react';
import FAQForm from './components/FAQForm';
import FAQList from './components/FAQList';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const fetchFAQs = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="app-container">
            <FAQForm fetchFAQs={fetchFAQs} />
            <FAQList key={refresh} fetchFAQs={fetchFAQs} />
        </div>
    );
};

export default App;
