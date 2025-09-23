import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts'], //  Procura por arquivos de teste na pasta src.**/*.test.ts
  },
});
