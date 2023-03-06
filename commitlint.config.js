module.exports = {
  rules: {
    'commit-msg': [2, `always`],
  },
  plugins: [
    {
      rules: {
        'commit-msg': (data) => {
          if (
            data.raw &&
            typeof data.raw === 'string' &&
            new RegExp('^PW-\\d*.\\s[A-Z].*').test(data.raw?.trim())
          ) {
            return [true, 'success'];
          }

          return [
            false,
            `Commit message must match the pattern: ^PW-\\d*.\\s[A-Z].* \nExample: PW-123 Add user entity`,
          ];
        },
      },
    },
  ],
};
