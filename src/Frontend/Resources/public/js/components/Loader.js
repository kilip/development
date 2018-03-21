import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

export class Loader extends Component {
    render(){
        return (
            <div id="loader-element">
                { this.props.children }
                {
                    this.props.loading &&
                    <div className="loading"/>
                }
            </div>
        );
    }
}

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        loading: state.app.loading,
    }
};

export default connect(mapStateToProps)(Loader);