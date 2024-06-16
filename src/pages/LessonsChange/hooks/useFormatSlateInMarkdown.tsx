import { useCallback } from 'react';
import { serialize } from 'remark-slate';

const OPTIONS = {
  nodeTypes: {
    paragraph: 'p',
    block_quote: 'blockquote',
    code_block: 'code_block',
    link: 'link',
    ul_list: 'unnumberedList', //"ul",
    ol_list: 'numberedList', //"ol",
    listItem: 'li',
    heading: {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
      5: 'h5',
      6: 'h6',
    },
    emphasis_mark: 'em',
    strong_mark: 'bold',
    delete_mark: 'strikethrough',
    inline_code_mark: 'code',
    thematic_break: 'thematic_break',
    image: 'img',
  },
};

export const useFormatSlateInMarkdown = () => {
  const formatRes = useCallback((slate: any, type: string) => {
    if (slate) {
      let slateFormat = slate;
      if (type === 'unnumberedList' || type === 'numberedList') {
        slateFormat = [
          {
            type,
            //@ts-ignore
            children: slate.map(item => ({
              type: 'li',
              children: [...item.children],
            })),
          },
        ];
      }

      const res = slateFormat //@ts-ignore
        .map(node => serialize(node, OPTIONS))
        .join('\n');

      return res;
    }
  }, []);

  return { formatRes };
};
