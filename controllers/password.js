const { User } = require("../models");
const { decrypt } = require("../utils/crypt");

const pass = require("../utils/password");

// Change Password - When User Logged In Situation
module.exports.update = async (request, reply) => {
  try {
    const { user_id } = request.user;
    const { new_password, old_password } = request.body;

    const user = await User.findOne({
      where: { id: user_id },
      attributes: ["id", "password", "is_active", "log_limits"],
    });

    // Double Check for user Existance
    if (!user) {
      throw new Error("User does not exist!");
    }

    // check if password correct
    const authenticated = pass.compare(old_password, user.password);

    // Updating log_limit if the password is not correct
    if (!authenticated) {
      if (user.log_limits === 3) {
        user.is_active = false;
        await user.save();
        throw new Error(
          "Incorrect Password Entered 3 times, Account is Deactivated"
        );
      } else if (user.log_limits < 3) {
        user.log_limits = user.log_limits + 1;
        await user.save();
        throw new Error("Incorrect password");
      }
    }

    const checkPassword = pass.test(password);

    if (checkPassword.error) {
      throw new Error(checkPassword.message);
    }

    // create New Hash Password
    const hash = pass.compare(new_password);

    // Save new hash password
    user.password = hash;
    await user.save();

    return reply.code(200).send({
      code: 200,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// Reset Password After OTP Process
module.exports.reset = async (request, reply) => {
  try {
    const { encryption, new_password } = request.body;
    const user_id = decrypt(encryption);
    const user = await User.findOne({ where: { id: user_id } });

    let regex = /^[a-zA-Z0-9_-]+$/;
    let result = regex.test(new_password);
    if (!result) {
      throw new Error(
        "The password must only contain letters, numbers, dashes and underscores."
      );
    }

    if (new_password.length < 6) {
      throw new Error("The password must be at least 6 characters.");
    }

    // create New Hash Password
    const hash = pass.hash(new_password);

    // Save new hash password
    user.password = hash;
    await user.save();
    return reply.code(200).send({
      code: 200,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
