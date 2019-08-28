import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'umd',
        name: 'xtermTheme'
    },
    plugins: [babel(), terser()]
};
