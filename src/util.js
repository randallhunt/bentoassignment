export function lastWord(text) {
    const words = text.replace(/^\W+|\W+$/g, '').split(/\W+/);
    return words.pop();
}

export function compareWords(a, b) {
    if (a.lastWord.toLowerCase() < b.lastWord.toLowerCase()) return -1;
    if (a.lastWord.toLowerCase() > b.lastWord.toLowerCase()) return 1;
    return 0;
}

export function parseImages(xml) {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    return Array.from(doc.querySelectorAll('data images image')).map(node => {
        return {
            id: node.querySelector('id').textContent,
            url: node.querySelector('url').textContent,
            source: node.querySelector('source_url').textContent
        };
    });
}