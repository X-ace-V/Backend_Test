
export const extractTextFromHTML = (html) => {
    return html.replace(/<[^>]+>/g, "").trim();
};

export const replaceTextInHTML = (html, originalText, translatedText) => {
    const escapedOriginal = originalText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedOriginal, "gi");
    return html.replace(regex, translatedText);
};
