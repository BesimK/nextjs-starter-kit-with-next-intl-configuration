import {getPresets} from 'eslint-config-molindo';

export default [
  ...(await getPresets('typescript', 'react', 'tailwind')),
  {
    rules: {
      'func-style': 'off',
      'react/prop-types': 'off'
    }
  }
];
