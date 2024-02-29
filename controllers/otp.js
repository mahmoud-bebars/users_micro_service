const { User } = require("../models");
const { generate } = require("../utils/otp");
const { encrypt } = require("../utils/crypt");

// Request OTP to Change Password
module.exports.request = async (request, reply) => {
  try {
    const { redis } = request.server;
    const { phone } = request.params;
    const user = await User.findOne({
      where: { phone: phone },
      attributes: ["id"],
    });

    if (!user) {
      throw new Error("User does not exist!");
    }
    // genrate otp from 6 digiats
    const otp = generate();

    // save on redis with expiration for 600 second --> 10 mintues
    await redis.setex(otp, 600, phone);

    /* 
    ... the Logic where the otp will be sent to user 
    */

    return reply.code(200).send({
      code: 200,
      results: `An 6 digit code has been sent to ${phone} expires in 10 minutes`,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// Verfiy OTP
module.exports.verfiy = async (request, reply) => {
  try {
    let results = {};

    const { redis } = request.server;

    const { phone } = request.params;

    const { otp } = request.query;
    const { id } = await User.findOne({
      where: { phone: phone },
      attributes: ["id"],
    });

    if (!id) {
      throw new Error("User does not exist!");
    }

    const saved_otp = await redis.get(otp);

    if (saved_otp) {
      const encryption = encrypt(`${id}`);
      results = {
        message: `OTP Verfied Sucessfully`,
        encryption: encryption,
      };
    } else {
      throw new Error("OTP has expired! request another one...");
    }

    return reply.code(200).send({
      code: 200,
      results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
