import App, { Container } from "next/app";
import React from "react";
import Head from "next/head";
import Package from "../package.json";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import Navbar from "../src/components/Navbar.js";
class MyApp extends App {
  render() {
    const { name } = Package;
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
              key="viewport"
            />
            <link rel="stylesheet" href="./static/bootstrap.min.css" />
          </Head>
          <Navbar siteName={"Moi Scrape"} />
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
