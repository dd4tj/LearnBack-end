'use strict';

module.exports = {
   async up(queryInterface, Sequelize) {
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
       */
      return queryInterface.bulkInsert('Users', [
         {
            email: 'example@example.com',
            password: '123456',
            firstName: 'Tran',
            lastName: 'Dat',
            address: 'Thainguyen',
            gender: 1,
            typeRole: 'ROLE',
            keyRole: 'R1',
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      return queryInterface.bulkDelete('Users', null, {});
   },
};
