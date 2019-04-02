import { connect } from "react-redux";
import PropTypes from "prop-types";
import Template from "../src/components/Template";
import Header from "../src/components/Header";
import UrlInput from "../src/components/UrlInput";

const Index = props => (
  <Template id="home" className={"container pt-5"}>
    <Header className={"pt-5"}>
      <h1 className="text-center">Welcome to Moi Scrape</h1>
    </Header>
    <UrlInput />
    <style jsx>{`
      .template {
        background-color: #eee !important;
      }
    `}</style>
  </Template>
);
Index.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Index);
