import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {removeError, removeSuccess, removeInfo} from "./actions";

class Flash extends Component {

    flashRemove = (id) => {
        if(id){
            this.props.removeSuccess(id,this.props.namespace);
            this.forceUpdate();
        }
    };

    flashSuccess = (item) => {
        const { namespace, message } = item;
        if(namespace !== this.props.namespace){
            return null;
        }
        return (
            <div key={item.id} id={item.id} className="alert alert-success">
                <button className='close'
                        data-dismiss='alert' onClick={() => this.flashRemove(item.id) }>
                    &times;
                </button>
                <span dangerouslySetInnerHTML={{__html: message}}/>
            </div>
        );
    };

    render(){
        const success = this.props.success;
        return (
            <div className="notification">
                {
                    success && success.map((item) => this.flashSuccess(item))
                }
            </div>
        );
    }
}

Flash.propTypes = {
    success: PropTypes.array,
    error: PropTypes.array,
    info: PropTypes.array,
    namespace: PropTypes.string.isRequired,
    removeError: PropTypes.func.isRequired,
    removeSuccess: PropTypes.func.isRequired,
    removeInfo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        success: state.flash.success,
        error: state.flash.error,
        info: state.flash.info
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeError: (id,namespace) => dispatch(removeError(id,namespace)),
        removeSuccess: (id,namespace) => dispatch(removeSuccess(id,namespace)),
        removeInfo: (id,namespace) => dispatch(removeInfo(id,namespace))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
