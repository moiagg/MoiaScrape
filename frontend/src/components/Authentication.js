import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextFieldGroup } from "./common";
import { testAuth } from "../actions/authActions";

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  static getInitialProps() {
    console.log("got props");
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const loginData = {
      email: email,
      password: password
    };
    // this.props.createProfile(profileData, this.props.history);
    this.props.testAuth(loginData);
    console.log("submit");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            label={"Email"}
            type={"email"}
            placeholder={"Email Address"}
            info={"Please enter your email address"}
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            // error={errors.email}
          />

          <TextFieldGroup
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
            info={"Please enter your password"}
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            // error={errors.email}
          />

          <button className="btn btn-dark">Submit</button>
        </form>
      </div>
    );
  }
}
Authentication.propTypes = {
  testAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { testAuth }
)(Authentication);
