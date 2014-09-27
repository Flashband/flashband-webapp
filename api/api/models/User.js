module.exports = {
  autoCreatedAt: true,
  attributes: {
    email: { type: 'string' },
    tokens: { collection: 'token', via: 'user' },
    mobpassword: { type: 'string' },
    webpassword: { type: 'string' }
  }
};
