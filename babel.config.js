// babel config
// @author MOYAN <moyan@come-future.com>
// @create 2020/07/31 09:26

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['Chrome >= 65', 'Firefox >= 55', 'Safari >= 11'],
        node: 'current',
      },
      // modules: false
    }],
    '@babel/preset-typescript'
  ],
  plugins: [

  ]
}
