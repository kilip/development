import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends Component {
  renderField(data) {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
      data.input['aria-describedby'] = `baptisan_${data.input.name}_helpBlock`;
      data.input['aria-invalid'] = true;
    }

    return (
        <div className={`form-group${hasError ? ' has-error' : ''}`}>
          <label htmlFor={`baptisan_${data.input.name}`} className="control-label">{data.input.name}</label>
          <input
              {...data.input}
              type={data.type}
              step={data.step}
              required={data.required}
              placeholder={data.placeholder}
              id={`baptisan_${data.input.name}`}
              className="form-control"
          />
          {hasError && <span className="help-block" id={`baptisan_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
        </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit}>
          <Field component={this.renderField} name="nama" type="text" placeholder="" required={true}/>
          <Field component={this.renderField} name="namaBaptis" type="text" placeholder="" />
          <Field component={this.renderField} name="ayah" type="text" placeholder="" required={true}/>
          <Field component={this.renderField} name="ibu" type="text" placeholder="" required={true}/>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
  }
}

export default reduxForm({form: 'baptisan', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
