// Token Verfication
// This is the Most Import Entry in Our Service
// ? We are depending on it to Authorize Users All over the Other Services when it's needed VIA https || RabbitMQ
module.exports.verify = async (request, reply) => {
  try {
    const { redis } = request.server;
    const results = request.user;

    // save on redis with expiration for  24 hours
    await redis.setex(
      `user:${results.user_id}`,
      60 * 60 * 24,
      JSON.stringify(results)
    );

    return reply.code(200).send({
      code: 200,
      results: results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
