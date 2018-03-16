import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends Component {
    renderField(data){
        const hasError = data.meta.touched && !!data.meta.error;
        data.input.className = 'form-control';

        const isInvalid = data.meta.touched && !!data.meta.error;
        if (isInvalid) {
            data.input.className += ' is-invalid';
            data.input['aria-invalid'] = true;
        }

        if (hasError && data.meta.touched && !data.meta.error) {
            data.input.className += ' is-valid';
        }

        return (
            <div className={`form-group`}>
              <label htmlFor={`baptisan_${data.input.name}`} className="form-control-label">{data.input.name}</label>
              <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`baptisan_${data.input.name}`}/>
              {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
              <Field component={this.renderField} name="nama" type="text" placeholder="" />
              <Field component={this.renderField} name="namaBaptis" type="text" placeholder="" />
              <Field component={this.renderField} name="ayah" type="text" placeholder="" />
              <Field component={this.renderField} name="ibu" type="text" placeholder="" />
              <Field component={this.renderField} name="jenisKelamin" type="number" placeholder="" />

              <button type="submit" className="btn btn-success">Submit</button>
            </form>
        );
    }
}



export default reduxForm({form: 'baptisan', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
