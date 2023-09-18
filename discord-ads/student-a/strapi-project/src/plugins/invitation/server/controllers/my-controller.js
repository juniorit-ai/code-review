'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('invitation')
      .service('myService')
      .getWelcomeMessage();
  },
});
