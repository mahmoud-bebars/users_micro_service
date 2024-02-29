const { Role, Country } = require("../models");

module.exports.fetchHome = async (request, reply) => {
  return reply.sendFile("index.html");
};

// featch Users Avaliable Roles
module.exports.fetchTypes = async (request, reply) => {
  try {
    const results = await Role.findAll();

    return reply.code(200).send({
      code: 200,
      results: results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// fetch Countries
module.exports.fetchCountries = async (request, reply) => {
  try {
    const results = await Country.findAll();

    return reply.code(200).send({
      code: 200,
      results: results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
