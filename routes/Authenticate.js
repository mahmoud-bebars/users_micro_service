const Authentication = require("../controllers/Authentication");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Login */
  fastify.post("/login", Authentication.login);

  /* Register */
  fastify.post("/register", Authentication.register);
}

module.exports = routes;
