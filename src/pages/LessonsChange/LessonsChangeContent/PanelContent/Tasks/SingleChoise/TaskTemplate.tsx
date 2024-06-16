//TODO: удалить если не используется

import React from 'react';

//@ts-ignore
const withWrapper = WrappedComponent => {
  //@ts-ignore
  return props => {
    return (
      <div className='wrapper'>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

//@ts-ignore
const MyComponent = ({ name }) => {
  return <p>Hello, {name}!</p>;
};

const WrappedComponent = withWrapper(MyComponent);

const App = () => {
  return (
    <div>
      <WrappedComponent name='John' />
    </div>
  );
};

export default App;
