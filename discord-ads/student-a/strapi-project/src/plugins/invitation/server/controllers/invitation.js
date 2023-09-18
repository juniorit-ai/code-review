"use strict";

module.exports = {
  async find(ctx) {
    try {
      return await strapi
        .plugin("invitation")
        .service("invitation")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("invitation")
        .service("invitation")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async unused(ctx) {
    try {
      return await strapi
        .plugin("invitation")
        .service("invitation")
        .unused(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
