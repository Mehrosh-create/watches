module.exports = {
  async redirects() {
    return [
      {
        source: '/reset-example',
        destination: '/',
        permanent: false,
      }
    ];
  },
};