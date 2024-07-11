const axios = require('axios');

// Function to fetch results from google
const fetchGoogleResults = async query => {
  const { GOOGLE_BASE_URL, GOOGLE_API_KEY, GOOGLE_CX } = process.env;

  const response = await axios.get(GOOGLE_BASE_URL, {
    params: {
      key: GOOGLE_API_KEY,
      cx: GOOGLE_CX,
      q: query,
    },
  });

  return response.data.items;
};

module.exports = { fetchGoogleResults };
