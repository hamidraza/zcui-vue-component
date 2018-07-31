import pkg from './package.json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
// import autoprefixer from 'autoprefixer';
// import csso from 'postcss-csso';
// import sass from 'rollup-plugin-sass';

const isProd = process.env.NODE_ENV == 'production';

const rollupConf = {
  input: './src/main.js',
  output: [
    { format: 'es', file: pkg.module },
    { format: 'cjs', file: pkg.main },
    { format: 'umd', file: pkg.unpkg, name: 'VueComponent', globals: { vue: 'Vue' } },
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    postcss({
      extract: true,
    }),
    babel(),
  ],
  external: ['vue']
};

if(isProd) {
  rollupConf.plugins.push(...[
    // uglify(),
  ]);
}

export default rollupConf;

