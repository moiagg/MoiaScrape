import axios from "axios";
//Types
import { GET_SCRAPE_DATA } from "./types";

// Test Authentication
export const getScrapeData = (scrapeData) => dispatch => {
  // Posts User Information
  axios
    .post("http://localhost:5000/moiscrape/scrape", scrapeData)
    .then(res => {
      // dispatch({
      //   type: GET_SCRAPE_DATA,
      //   payload: true
      // });
    })
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // );
};