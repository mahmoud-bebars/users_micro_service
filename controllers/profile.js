const { User } = require("../models");

const media = require("../utils/media");

// Dividing Information Updating Makes Debugging Easier

// Update Profile Info
module.exports.update = async (request, reply) => {
  try {
    const { user_id } = request.user;
    const { first_name, last_name, email } = request.body;

    await User.update(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
      { where: { id: user_id } }
    );

    return reply.code(200).send({
      code: 200,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// Update Profile Country - User Optional
module.exports.updateCountry = async (request, reply) => {
  try {
    const { user_id } = request.user;
    const { country } = request.body;

    await User.update(
      {
        country_id: country,
      },
      { where: { id: user_id } }
    );

    return reply.code(200).send({
      code: 200,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// change Avatar ONLY !!!
module.exports.updateAvatar = async (request, reply) => {
  try {
    const { user_id } = request.user;

    // Move uploaded files to the new filenames using fs module @ the id from the params using the feild name
    request.files.forEach(async (file) => {
      await media.processTemp(file, user_id);
    });
    const avatar_path = `public/assets/avatars/avatar_${user_id}.webp`;

    await User.update(
      {
        avatar: avatar_path,
      },
      { where: { id: user_id } }
    );

    return reply.code(200).send({
      code: 200,
      results: avatar_path,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
