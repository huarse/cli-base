// babel config
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/07/31 09:26

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['Chrome >= 75'],
        // node: 'current',
      },
      // modules: false
    }],
    '@babel/preset-typescript'
  ],
  plugins: [

  ]
}
