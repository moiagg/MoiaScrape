import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextFieldGroup } from "./common";
import { getScrapeData } from "../actions/authActions";

class UrlInput extends Component {
  constructor() {
    super();
    this.state = {
      url:''
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
    const { url } = this.state;
    const scrapeData = {
      url: url
    };

    this.props.getScrapeData(scrapeData);
    console.log("submit");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            className={"file-input"}
            label={"Enter Url"}
            type={"url"}
            placeholder={"https://test.com/"}
            info={"Please Enter Your URL"}
            name="url"
            value={this.state.url}
            onChange={this.onChange}
            // error={errors.email}
          />
          <button className="btn btn-dark">Submit</button>
        </form>
      </div>
    );
  }
}
UrlInput.propTypes = {
  getScrapeData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getScrapeData }
)(UrlInput);
