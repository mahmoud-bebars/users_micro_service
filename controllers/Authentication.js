const { User, Role, Country } = require("../models");
const moment = require("moment");

const pass = require("../utils/password");

// Register (For Normal Users Only - others account Craetion Will be handled from Users Controller)
module.exports.register = async (request, reply) => {
  try {
    const {
      phone,
      email,
      password,
      first_name,
      last_name,
      username,
      country_id,
    } = request.body;

    // Check is user Exist By Phone/Email
    const checkOptions = {
      where: {
        phone: phone,
      },
      attributes: ["id"],
    };
    // since Email is not Required for me i Add it only if it'not empty
    if (email !== "")
      checkOptions.where = { ...checkOptions.where, email: email };

    const existUser = await User.findOne(checkOptions);

    if (existUser) {
      throw new Error("Phone/Email Already Taken...");
    }
    // using utilty we check on user valitaty
    const checkPassword = pass.test(password);

    if (checkPassword.error) {
      throw new Error(checkPassword.message);
    }

    // Creating Hash Password ONE WAY !!!
    const hash = pass.hash(password);

    // Create User in Databse
    const createOptions = {
      phone: phone,
      password: hash,
      first_name: first_name,
      last_name: last_name,
      username: username,
      country_id: country_id,
    };

    // since Email is not Required for me i Add it only if it'not empty
    if (email !== "") createOptions = { ...createOptions, email: email };

    await User.create();

    /* 
      ? Any Extra Logic Can Be added Here Specifaclly If it depends on User Creation...
    */

    // We are Sending Code Only
    // Assume  Front Developer is Cool Enough To send Login Request to Authorize The user Automatically using login request via http
    return reply.code(201).send({
      code: 201,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// Login (Works for All System Users)
module.exports.login = async (request, reply) => {
  try {
    const { jwt } = request.server;
    const { phone, password } = request.body;

    // 1st Fetch User By Phone
    const user = await User.findOne({
      where: { phone },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone",
        "email",
        "password",
        "is_active",
        "log_limits",
        "created_at",
      ],
      include: [
        { model: Role, as: "role" },
        { model: Country, as: "country", attributes: ["id", "name"] },
      ],
    });

    // 2nd Check on Uswer Existance
    if (!user) {
      throw new Error("User does not exist!");
    }
    // 3rd Check on User Active Status
    if (!user.is_active) {
      throw new Error("Account is Deactivated");
    }

    // 4th Check if password correct
    const authenticated = pass.compare(password, user.password);

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
    // 5th Sign access token for user
    const token = jwt.sign({
      user_id: user.id,
      role: user.role,
      country: user.country,
      phone: user.phone,
      email: user.email,
    });

    // 6th create Response Results
    let results = {
      accessToken: `Bearer ${token}`,
      user_id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      phone: user.phone,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      joined_at: moment(user.created_at).format("YYYY-MM-DD hh:mm A"),
    };

    // 7th update user log_limits
    user.log_limits = 0;
    await user.save();

    // 8th Send Reply
    return reply.code(200).send({
      code: 200,
      results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
