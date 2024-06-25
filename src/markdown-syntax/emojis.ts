import emojiesDefs from './helpers/full-emoji-list';
import emojiShortcuts from './helpers/emoji-shortcuts';
import MarkdownIt from 'markdown-it';
import normalizeOpts from './helpers/normalize-emojies';
import emojiHtml from './helpers/render';
import emojiReplace from './helpers/emoji-replace';

export default function emoji_plugin(md: MarkdownIt, options: any) {
    const defaults = {
        defs: emojiesDefs,
        shortcuts: emojiShortcuts,
        enabled: []
    };

    const opts = md.utils.assign({}, defaults, options || {});

    makeEmoji(md, opts);
}

function makeEmoji(md: MarkdownIt, options: any) {
    const defaults = {
        defs: {},
        shortcuts: {},
        enabled: []
      };

      const opts = normalizeOpts(md.utils.assign({}, defaults, options || {}));

      md.renderer.rules.emoji = emojiHtml;

      md.core.ruler.after(
        'linkify',
        'emoji',
        emojiReplace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE)
      );
}