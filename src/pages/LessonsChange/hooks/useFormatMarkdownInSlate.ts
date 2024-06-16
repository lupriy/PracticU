import { useCallback } from 'react';
import slate /* , { serialize } */ from 'remark-slate';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const OPTIONS = {
  nodeTypes: {
    paragraph: 'paragaph',
    block_quote: 'blockquote',
    code_block: 'code_block',
    link: 'link',
    ul_list: 'unnumberedList',
    ol_list: 'numberedList',
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

export const useFormatMarkdownInSlate = () => {
  const formatRes = useCallback((textMarkdown: string) => {
    let res;
    unified()
      .use(parse)
      .use(remarkGfm)
      .use(slate, OPTIONS)
      .process(textMarkdown, (_, nodes) => {
        res = nodes?.result;
      });

    //@ts-ignore
    const resFormat = res.map(item => {
      const { type, children } = item;
      //const firstChildText: string = children[0].text;

      /* if (firstChildText) {
        const lengthText = firstChildText.length;
        const split1 = firstChildText.slice(0, 1);
        const split2 = firstChildText.slice(0, 2);
        const split3 = firstChildText.slice(0, 3);

        if (split3 === "###") {
          const text = firstChildText.slice(3, lengthText - 1);
          return { ...item, type: "h1", children: [{ text }] };
        } else if (split2 === "##") {
          const text = firstChildText.slice(2, lengthText - 1);
          return { ...item, type: "h2", children: [{ text }] };
        } else if (split1 === "#") {
          const text = firstChildText.slice(1, lengthText - 1);
          return { ...item, type: "h1", children: [{ text }] };
        } else {
          return item;
        }
      }
 */

      if (type === 'unnumberedList' || type === 'numberedList') {
        const childrenFormat = children.reduce(
          //@ts-ignore
          (arr, { children }) => [...arr, ...children],
          []
        );

        return { ...item, children: childrenFormat };
        //временное решение от сюдв
      } else if (children && children[0].type === 'img') {
        return { type: 'photo', source: children[0].link };

        //до сюда
      } else if (type === 'code_block') {
        return { ...item, type: 'code' };
      } else {
        return item;
      }
    });

    return resFormat;
  }, []);

  return { formatRes };
};
