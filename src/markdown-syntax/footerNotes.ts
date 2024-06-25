import MarkdownIt from 'markdown-it';

export const footnotePlugin = (md: MarkdownIt) => {
    const footnoteRefs: Set<string> = new Set();
    const footnoteContents = new Map();
    

    md.core.ruler.push('capture_footnote_content', (state) => {
        const newFootnoteRefs = new Set();
        const newFootnoteContents = new Map();
    
        state.tokens.forEach(token => {
            if (token.type === 'inline') {
                token.children!.forEach((child, index, tokens) => {
                    const match = child.content.match(/^\[\^(\d+)\]:\s*(.*)$/);
                    if (match) {
                        const num = match[1];
                        const content = match[2];
                        newFootnoteRefs.add(num); // Temporarily store the reference
                        newFootnoteContents.set(num, content); // Temporarily store the content
                        // Remove the footnote declaration from the main content
                        tokens.splice(index, 1);
                    }
                });
            }
        });
    
        // Update the main footnoteRefs and footnoteContents only after processing all tokens
        // This ensures we only keep footnotes that are still defined in the document
        footnoteRefs.clear();
        newFootnoteRefs.forEach(ref => footnoteRefs.add(ref as string));
        footnoteContents.clear();
        newFootnoteContents.forEach((content, ref) => footnoteContents.set(ref, content));
    });

    md.core.ruler.push('parse_footnote_references', (state) => {
        state.tokens.forEach(token => {
            if (token.type === 'inline') {
                token.children!.forEach((child, index, tokens) => {
                    if (child.type === 'text') {
                        const newTexts = child.content.split(/(\[\^\d+\])/).filter(Boolean); // Split by the pattern and keep non-empty strings
                        if (newTexts.length > 1) { // Found at least one reference
                            // Replace the current token with multiple tokens
                            tokens.splice(index, 1); // Remove the original token
                            newTexts.forEach((text, i) => {
                                const match = text.match(/\[\^(\d+)\]/);
                                if (match) {
                                    const num = match[1];
                                    footnoteRefs.add(num); // Store reference to ensure uniqueness
                                    tokens.splice(index + i, 0, new state.Token('html_inline', '', 0));
                                    tokens[index + i].content = ` <a href="#footnote-${num}"><sup>[${num}]</sup></a>`;
                                } else {
                                    tokens.splice(index + i, 0, new state.Token('text', '', 0));
                                    tokens[index + i].content = text;
                                }
                            });
                        }
                    }
                });
            }
        });
    });

    md.core.ruler.push('render_footnote_definitions', (state) => {
        if (footnoteRefs.size > 0) {
            const token = new state.Token('html_block', '', 0);
            token.content = '<footer class="footnotes">\n<ol>\n' +
                Array.from(footnoteRefs).map(num => {
                    const content = footnoteContents.get(num) || 'Missing footnote content';
                    return `<li id="footnote-${num}">${content} <a>↩</a> </li>`;
                }).join('\n') +
                '</ol>\n</footer>\n';
            state.tokens.push(token);
        }
    });
};