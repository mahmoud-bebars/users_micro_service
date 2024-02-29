"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
          id: 1,
          name: "Egypt",
          dial_code: "+20",
          country_code: "EG",
          allowed_phone_length: 11,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
