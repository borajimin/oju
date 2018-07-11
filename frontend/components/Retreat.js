import React from 'react';
import PropTypes from 'prop-types';

const Retreat = ({ name, content, testClick }) => {
    return (
        <div>
            <h1>{name}</h1>
            <button onClick={testClick}>Click me to test!</button>
            <h1>{content}</h1>
            <a href="/oauth/kakao">
                <img src="kakao_account_login_btn_large_narrow.png" />
            </a>
        </div>
    );
};

Retreat.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  testClick: PropTypes.func
};


export default Retreat;
