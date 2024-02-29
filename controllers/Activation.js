const { User } = require("../models");

// Update User Activation - Extra Entry to Enable Admin for Account Deactivtion on System Employees
// ? This Action Can Only Be Taken on System Employees Normal User Can not Be Deactivated By The System
module.exports.activate = async (request, reply) => {
  try {
    const results = request.user;
    const user = await User.findOne({ where: { id: results.user_id } });

    if (user.role_id === 5) {
      throw new Error("Can not Control Normal User Activation");
    }

    user.is_active = !user.is_active;
    user.save();

    return reply.code(200).send({
      code: 200,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
