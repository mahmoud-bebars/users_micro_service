const Authorization = require("../controllers/Authorization");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Verfiy Token */
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    Authorization.verify
  );
}

module.exports = routes;
