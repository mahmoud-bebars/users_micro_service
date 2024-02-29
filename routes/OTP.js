const otp = require("../controllers/otp");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Request OTP */
  fastify.post("/request", otp.request);

  /* Verfiy OTP */
  fastify.post("/verfiy", otp.verfiy);
}

module.exports = routes;
