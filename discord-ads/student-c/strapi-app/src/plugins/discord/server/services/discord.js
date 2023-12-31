"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::discord.discord",
      query
    );
  },

  async unused(query) {
    const unusedInvitations = await strapi.entityService.findMany(
      "plugin::discord.discord",
      { isInvited: false }
    );
    // Select one random index
    const randomIndex = Math.floor(Math.random() * unusedInvitations.length);

    // Retrieve and return the invitation at the random index
    const randomInvitation = unusedInvitations[randomIndex];
    randomInvitation.isInvited = true;

    // Save the updated invitation
    try {
        // Save the updated invitation
        const updatedInvitation = await strapi.entityService.update(
          "plugin::discord.discord",
          randomInvitation.id ,
          { data: randomInvitation } // Pass the entire object as the payload
        );

        console.log(randomInvitation)
    
        return updatedInvitation;
      } catch (error) {
        console.error(error);
        return null;
      }
  },

  async create(data) {
    return await strapi.entityService.create(
      "plugin::discord.discord",
      data
    );
  },
});
