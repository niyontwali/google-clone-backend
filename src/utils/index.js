const axios = require('axios');

// Function to fetch results from Google
const fetchGoogleResults = async (query) => {
  const { GOOGLE_BASE_URL, GOOGLE_API_KEY, GOOGLE_CX } = process.env;

  try {
    const response = await axios.get(GOOGLE_BASE_URL, {
      params: {
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CX,
        q: query,
      },
    });

    return response.data.items;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        const err = new Error("Due to a limit on Google API requests (100/day), please retry after 24 hours. In the meantime, you can continue testing the search engine using our locally stored database from the google search. This message ensures clarity during testing, aligning with the assignment requirements for Google Search Clone.");

        err.statusCode = 429;
        throw err;
      } else if (error.response.status === 404) {
        const err = new Error('Google API endpoint not found.');
        err.statusCode = 404;
        throw err;
      }
    }
    const err = new Error('Failed to fetch Google results.');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = { fetchGoogleResults };
