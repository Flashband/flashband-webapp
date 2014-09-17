module.exports = {
  autoCreatedAt: true,
  attributes: {
    name: { type: 'string' },
    flashbands: { collection: 'Flashband', dominant: true }
  },
};
