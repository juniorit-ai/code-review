module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth: false
    },
  },

  {
    method: 'GET',
    path: '/find',
    handler: 'discord.find',
    config: {
      policies: [],
      auth: false
    },
  },

  {
    method: 'GET',
    path: '/unused',
    handler: 'discord.unused',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: "POST",
    path: "/create",
    handler: "discord.create",
    config: {
      policies: [],
      auth: false
    },
  },
];
