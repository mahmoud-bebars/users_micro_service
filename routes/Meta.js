const meta = require("../controllers/meta");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Home */
  fastify.get(
    "/",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    meta.fetchHome
  );

  /* Countries */
  fastify.get("/countries", meta.fetchCountries);

  /* Role Types */
  fastify.get(
    "/types",
    { onRequest: [fastify.authenticate, fastify.isAdmin] },
    meta.fetchTypes
  );
}

module.exports = routes;
