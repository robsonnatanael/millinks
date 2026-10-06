import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { files: ['src/**/*.{js,mjs,cjs,ts}'] },
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
