import {lastWord, parseImages} from './util';

describe('lastWord()', () => {
    it('returns the last word from a piece of text', () => {
        const phrase = 'to be or not to be';
        expect(lastWord(phrase)).toBe('be');
    });

    it('is not fooled by punctuation', () => {
        const phrase = 'Luke... I am your father!!';
        expect(lastWord(phrase)).toBe('father');
    });
});

describe('parseImages()', () => {
    it('parses xml into a JSON structure', () => {
        const xml = `
            <response>
                <data>
                    <images>
                        <image>
                            <id>asdf</id>
                            <url>foo</url>
                            <source_url>bar</source_url>
                        </image>
                    </images>
                </data>
            </response>
        `;
        const data = parseImages(xml);
        expect(data[0].id).toBe('asdf');
        expect(data[0].url).toBe('foo');
        expect(data[0].source).toBe('bar');
    });
});