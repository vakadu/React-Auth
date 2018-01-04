import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signup extends Component{
    handleFormSubmit(formProps){
        //call action creator to sign up the user
        this.props.signupUser(formProps);
    }

    renderAlert(){
        if (this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-group">
                    <label>Email: </label>
                    <input className="form-control" {...email} />
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" className="form-control" {...password} />
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </div>
                <div className="form-group">
                    <label>Confirm Password: </label>
                    <input type="password" className="form-control" {...passwordConfirm} />
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </div>
                {this.renderAlert()}
                <button action="submit" className="btn btn-success">Sign Up</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email){
        errors.email = 'Please enter an email';
    }

    if (!formProps.password){
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password confirm';
    }

    //console.log(formProps);
    if (formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions) (Signup);
