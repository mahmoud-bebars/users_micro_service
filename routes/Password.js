const password = require("../controllers/password");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Password Update */
  fastify.put(
    "/update",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    password.update
  );

  /* Password Reset */
  fastify.put("/reset", password.reset);
}

module.exports = routes;
