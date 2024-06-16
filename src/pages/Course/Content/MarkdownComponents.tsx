/*
  eslint-disable
    jsx-a11y/alt-text,
    jsx-a11y/heading-has-content,
    jsx-a11y/anchor-has-content,
    jsx-a11y/anchor-is-valid,
*/
import styles from './styles.module.scss';
import { useRef } from 'react';
//@ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter/';
//@ts-ignore
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const MyImageComponent = ({ ...props }) => {
  const ref = useRef<HTMLImageElement>(null);
  const photoCaption = ref.current?.alt;

  return (
    <>
      <img {...props} className={styles['markdown-img']} ref={ref} />
      {photoCaption && (
        <div className={styles['markdown-img-caption']}>{photoCaption}</div>
      )}
    </>
  );
};

//@ts-ignore
const CodeBlock = ({ children, className }) => {
  const language = className?.replace('lang-', '');

  return (
    <SyntaxHighlighter
      language={language}
      className={styles.codeBlock}
      style={docco}
      customStyle={{ padding: 0 }}
      over
    >
      {children}
    </SyntaxHighlighter>
  );
};

export const MARKDOWN_OVERRIDED_COMPONENTS = {
  li: <li className={styles['markdown-li']} />,
  // alt добавляется автоматически в Markdown компоненте
  img: {
    component: MyImageComponent,
    props: {
      className: styles['markdown-img'],
    },
  },
  p: <p className={styles['markdown-p']} />,
  // h2 контент генерируется в Markdown компоненте
  h2: <h2 className={styles['markdown-h2']} />,
  // href генерируется в Markdown компоненте
  a: <a className={styles['markdown-a']} target='_blank' />,
  // code: <code className={styles['markdown-code']} />,
  code: {
    component: CodeBlock,
  },
};
