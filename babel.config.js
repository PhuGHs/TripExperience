module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
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
    ]
  };
  