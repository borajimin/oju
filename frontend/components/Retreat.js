import React from 'react';
import PropTypes from 'prop-types';

const Retreat = ({ name, content, testClick}) => {
    return (
        <div>
            <h1>{name}</h1>
            <button onClick={testClick}>Click me to test!</button>
            <h1>{content}</h1>
        </div>
    );
};

Retreat.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  testClick: PropTypes.func
};


export default Retreat;
