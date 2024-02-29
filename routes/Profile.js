const profile = require("../controllers/profile");
const multer = require("fastify-multer");
const media = require("../utils/media");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Register Multer */
  fastify.register(multer.contentParser);
  /* Profile Update */
  fastify.put(
    "/update",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    profile.update
  );

  /* Profile Country */
  fastify.put(
    "/country",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    profile.updateCountry
  );

  /* Profile Avavtar */
  fastify.put("/avatar", {
    onRequest: [fastify.authenticate, fastify.isActive],
    preHandler: media.uploadMedia,
    handler: profile.updateAvatar,
  });
}

module.exports = routes;
