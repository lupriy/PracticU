import { Link } from './Link';

//@ts-ignore
export const getBlock = props => {
  const { element, children, type } = props;
  const attributes = props.attributes ?? {};

  switch (type) {
    case 'headingOne' || 'h1':
      return (
        <h1 {...attributes} {...element.attr}>
          {children}
        </h1>
      );
    case 'h2':
    case 'headingTwo':
      return (
        <h2 {...attributes} {...element.attr}>
          {children}
        </h2>
      );
    case 'headingThree' || 'h3':
      return (
        <h3 {...attributes} {...element.attr}>
          {children}
        </h3>
      );
    case 'blockquote':
      return (
        <blockquote {...attributes} {...element.attr}>
          {children}
        </blockquote>
      );
    case 'alignLeft':
      return (
        <div
          style={{ listStylePosition: 'inside' }}
          {...attributes}
          {...element.attr}
        >
          {children}
        </div>
      );
    case 'alignCenter':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            listStylePosition: 'inside',
            flexDirection: 'column',
          }}
          {...attributes}
          {...element.attr}
        >
          {children}
        </div>
      );
    case 'alignRight':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            listStylePosition: 'inside',
            flexDirection: 'column',
          }}
          {...attributes}
          {...element.attr}
        >
          {children}
        </div>
      );
    case 'list-item':
      return (
        <li {...attributes} {...element.attr}>
          {children}
        </li>
      );
    case 'orderedList':
      return <li>{children}</li>;
    case 'unorderedList':
      return <ul {...attributes}>{children}</ul>;
    case 'link':
      return <Link {...props} />;

    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return (
        <td {...element.attr} {...attributes}>
          {children}
        </td>
      );

    default:
      return (
        <div {...element.attr} {...attributes}>
          {children}
        </div>
      );
  }
};
