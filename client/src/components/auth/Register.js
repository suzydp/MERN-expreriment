import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  // create component constructor
  constructor() {
    super();
    // initialize state (as an object)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this);
    // or you can add 'bind(this)' to each of onChange
    this.onSubmit = this.onSubmit.bind(this);
  }

  // to handle change state
  onChange(event) {
    // you can set this event multiplying
    // thanks to set this value
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();

    // to check the condition for submitting
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    // any aciton calls through the props
    this.props.registerUser(newUser);

    // // axios will post the data to the database
    // axios.post('api/users/register', newUser)
    //   // it supposed to be returned the value in console.log, which is set on server/api
    //   .then(result => console.log(result.data))
    //   // to show the error which is in state objects
    //   .catch(error => this.setState({errors: error.response.data}));
  }

  render() {

    // to handle state to be appear conditional error
    const { errors } = this.state;

    const { user } = this.props.auth;

    return (
      <div className="register">
        {/* if user has a terenary operator */}
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              {/* add noValidate if you don't wanna add alert from html5 */}
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames('form-control form-control-lg', {
                      // is-invalid - which's surrounded by {} is gonna activate if errors.name exists
                      'is-invalid': errors.name
                    })}
                    placeholder="Name" 
                    name="name"
                    // linking with the state value above
                    value={this.state.name} 
                    onChange={this.onChange} 
                  />
                  {/* invoke error messages from backend */}
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })} 
                    placeholder="Email Address" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })} 
                    placeholder="Password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })} 
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);