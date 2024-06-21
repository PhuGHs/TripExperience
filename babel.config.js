module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@component': './src/components',
            '@type': './src/types',
            '@navigation': './src/navigation',
            '@screen': './src/screens',
            '@hook': './src/hooks',
            '@asset': './src/assets',
            '@root': './src'
          }
        }
      ],
      'react-native-reanimated/plugin',
    ]
  };
  