import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const configFile = process.env.NODE_ENV === 'development' ? 'config.dev.json' : 'config.prod.json';

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false
    },
    watch:
      process.env.NODE_ENV === 'development'
        ? {
            exclude: ['dist']
          }
        : undefined,
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      replace({
        __NODE_ENV__: process.env.NODE_ENV === 'development' ? '"DEVELOPMENT"' : '"PRODUCTION"'
      }),
      copy({
        targets: [
          { src: './index.html', dest: 'dist' },
          { src: './' + configFile, dest: 'dist', to: './dist/config.js', toType: 'file' }
        ]
      }),
      process.env.NODE_ENV === 'development' &&
        serve({
          port: 3003,
          contentBase: 'dist',
          headers: { 'Access-Control-Allow-Origin': '*' },
          historyApiFallback: true
        }),
      process.env.NODE_ENV === 'development' && livereload({ watch: 'dist' })
    ]
  }
];
