import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import packageJson from "./package.json" assert { type: 'json' };

/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'lib/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
  ],
  external: [/node_modules/],
};
