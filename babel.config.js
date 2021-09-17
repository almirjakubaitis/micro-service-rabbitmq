module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@modules': './src/modules',
        '@infra': './src/infra',
        '@config': './src/config',
        '@shared': './src/shared',
        '@test': './src/test',
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ["@babel/plugin-proposal-private-property-in-object", { 'loose': true }],
  ],
}

