const axios = require("axios");
require("dotenv").config();

exports.handler = async (event, context) => {
  try {
    const data1 = await axios
      .get(
        `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.API_KEY}&from=USD&to=RUB&format=json`
      )
      .then((resp) => resp.data);
    const data2 = await axios
      .get(
        `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.API_KEY}&from=EUR&to=RUB&format=json`
      )
      .then((resp) => resp.data);
    const data3 = await axios
      .get(
        `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.API_KEY}&from=JPY&to=RUB&format=json`
      )
      .then((resp) => resp.data);
    //   .then((resp) => {
    //     console.log(resp);
    //     return resp.data;
    //   });
    console.log([data1, data2, data3], "ssfsfd");
    return {
      statusCode: 200,
      body: JSON.stringify([data1, data2, data3]),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
