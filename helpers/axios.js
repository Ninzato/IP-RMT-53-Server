const axios = require("axios");

exports.instance = axios.create({
  baseURL: "https://www.dnd5eapi.co/",
});
