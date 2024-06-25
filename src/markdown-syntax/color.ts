import MarkdownIt from "markdown-it";

export const colorPlugin = (md: MarkdownIt) => {
    // Override the default inline code render rule
    const defaultCodeRender = md.renderer.rules.code_inline || ((tokens, idx, options, env, self) => {
      return self.renderToken(tokens, idx, options);
    });
  
    md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const text = token.content;
      // Match color codes within the text
      const colorRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b|rgb\((\d{1,3}%?,\s*\d{1,3}%?,\s*\d{1,3}%?)\)|hsl\((\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%)\)/g;
      let match;
      let result = '';
      let lastEnd = 0;
  
      while ((match = colorRegex.exec(text)) !== null) {
        // Append text before the color code
        result += text.slice(lastEnd, match.index);
        // Extract the color code
        const colorCode = match[0];
        // Determine the format of the color code (hex, RGB, or HSL)
        let backgroundColor;
        if (colorCode.startsWith('#')) {
          backgroundColor = colorCode; // Hex
        } else if (colorCode.startsWith('rgb')) {
          backgroundColor = colorCode; // RGB
        } else if (colorCode.startsWith('hsl')) {
          backgroundColor = colorCode; // HSL
        } else {
          backgroundColor = 'transparent'; // Fallback
        }
        // Append the color code with a visual representation
        result += `<span>${colorCode}</span><span style="display: inline-block; width: 15px; height: 15px; background-color: ${backgroundColor}; margin-left: 5px;"></span>`;
        lastEnd = match.index + match[0].length;
      }
      // Append any remaining text after the last color code
      result += text.slice(lastEnd);
      
      // If no color code was found, return the default rendering
      if (result === '') {
        return defaultCodeRender(tokens, idx, options, env, self);
      }
  
      // Otherwise, return the modified content wrapped in a code tag
      return `<code style="display:inline-flex; align-items:center; width: fit-content;">${result}</code>`;
    };
  };