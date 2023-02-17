import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'

const extensions = ['.ts', '.js']

const config = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'default',
    },
  ],
  external: ['fs'],
  plugins: [
    nodeResolve({
      jsnext: true,
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),
    terser(),
    json(),
    commonjs()
  ],
}

export default config
