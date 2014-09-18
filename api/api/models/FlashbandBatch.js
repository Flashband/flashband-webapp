module.exports = {
  autoCreatedAt: true,
  attributes: {
    name: { type: 'string' },
    file: { type: 'string' },
    flashbands: { collection: 'Flashband', dominant: true }
  },
};
