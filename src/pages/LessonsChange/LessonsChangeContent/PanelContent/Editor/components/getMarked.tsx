import { Link } from './Link';

//@ts-ignore
export const getMarked = (/* leaf, children,  */ props) => {
  let { leaf, children } = props;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  } else if (leaf.code) {
    children = <code>{children}</code>;
  } else if (leaf.italic) {
    children = <em>{children}</em>;
  } else if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: 'line-through' }}>{children}</span>
    );
  } else if (leaf.underline) {
    children = <u>{children}</u>;
  } else if (leaf.superscript) {
    children = <sup>{children}</sup>;
  } else if (leaf.subscript) {
    children = <sub>{children}</sub>;
  } else if (leaf.color) {
    children = <span style={{ color: '#FFCBB1' }}>{children}</span>;
  } else if (leaf.bgColor) {
    children = <span style={{ backgroundColor: '#FFCBB1' }}>{children}</span>;
  } else if (children?.props?.parent?.type === 'link') {
    children = <Link {...props}>{children}</Link> /* (
      <a href={children?.props?.parent?.href} target="_blank" rel="noreferrer">
        {children?.props?.parent?.children[0].text}
      </a>
    ) */;
  } else if (children?.props?.parent?.internalType === 'h1') {
    children = <h1>{children}</h1>;
  } else if (children?.props?.parent?.internalType === 'h2') {
    children = <h2>{children}</h2>;
  } else if (children?.props?.parent?.internalType === 'h3') {
    children = <h3>{children}</h3>;
  }
  return children;
};
