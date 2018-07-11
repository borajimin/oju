import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { test } from '../actions/index';
import Retreat from '../components/Retreat';

let RetreatContainer = ({ name, testAction, content }) => {
    return (
        <div>
            <h1>App works!</h1>
            <Retreat
              name={name}
              content={content}
              testClick={() => testAction("Action test worked!")}
            />
        </div>
    );
};

RetreatContainer.propTypes = {
    name: PropTypes.string,
    content: PropTypes.string,
    testAction: PropTypes.func,

};

const mapStateToProps = state => {
    return {
        name: state.name,
        content: state.content
    };
};

const mapDispatchToProps = dispatch => {
    return {
        testAction: content => {
            dispatch(test(content));
        }
    };
};
RetreatContainer = connect(mapStateToProps, mapDispatchToProps)(RetreatContainer);

export default RetreatContainer;
