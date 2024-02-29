const Activation = require("../controllers/Activation");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Activation */
  fastify.put(
    "/",
    { onRequest: [fastify.authenticate, fastify.isAdmin] },
    Activation.activate
  );
}

module.exports = routes;
