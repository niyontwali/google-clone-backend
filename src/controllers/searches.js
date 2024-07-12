const logger = require('../../logs/configs');
const { Search } = require('../database/models');
const { fetchGoogleResults } = require('../utils');

const search = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      ok: false,
      message: 'Query parameter is required',
    });
  }

  try {
    // Check if the query exists in the database
    let results = await Search.findAll({ where: { searchQuery: query } });

    if (results.length === 0) {
      // If not found, fetch from Google API
      const googleResults = await fetchGoogleResults(query);

      // Save the results to the database
      results = await Promise.all(
        googleResults.map(async (result) => {
          return await Search.create({
            searchQuery: query,
            displayLink: result.link,
            title: result.title,
            snippet: result.snippet,
            image: result.pagemap?.cse_image?.[0]?.src || null,
          });
        })
      );
    }

    return res.json({
      ok: true,
      data: results,
    });
  } catch (error) {
    logger.error(`Error while searching: ${error.message}`);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'An error occurred while processing your request. Please try again later.';

    // Fetch data from the database if an error occurs related to google api limit
    if (statusCode === 429) {
      const dbResults = await Search.findAll();

      return res.status(statusCode).json({
        ok: false,
        message,
        data: dbResults.map(result => ({ id: result.id, searchQuery: result.searchQuery })),
      });
    }
    return res.status(statusCode).json({
      ok: false,
      message,
    });
  }
};

module.exports = { search };
