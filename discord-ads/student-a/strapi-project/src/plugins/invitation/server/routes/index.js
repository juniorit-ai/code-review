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
    handler: 'invitation.find',
    config: {
      policies: [],
      auth: false
    },
  },

  {
    method: 'GET',
    path: '/unused',
    handler: 'invitation.unused',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: "POST",
    path: "/create",
    handler: "invitation.create",
    config: {
      policies: [],
      auth: false
    },
  },
];
