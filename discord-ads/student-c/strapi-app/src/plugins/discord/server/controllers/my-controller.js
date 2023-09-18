'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('discord')
      .service('myService')
      .getWelcomeMessage();
  },
});
