'use strict';

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const pkg = require('./package.json');

const bundles = [
    {
        format: 'cjs',
        ext: '.js',
        dir: 'cjs',
        moduleName: 'jsignal',
        plugins: [ ],
        babelPresets: ['stage-0'],
        babelPlugins: [
            'transform-es2015-destructuring',
            'transform-es2015-function-name',
            'transform-es2015-parameters'
        ]
    },
    {
        format: 'es',
        ext: '.js',
        dir: 'es',
        moduleName: 'jsignal',
        plugins: [ ],
        babelPresets: ['stage-0'],
        babelPlugins: [
            'transform-es2015-destructuring',
            'transform-es2015-function-name',
            'transform-es2015-parameters'
        ]
    },
    {
        format: 'cjs',
        ext: '.js',
        dir: 'browser',
        moduleName: 'jsignal',
        plugins: [ ],
        babelPresets: ['es2015-rollup', 'stage-0'],
        babelPlugins: [
            //'external-helpers'
        ]
    },
    {
        format: 'umd',
        ext: '.js',
        dir: 'umd',
        moduleName: 'jsignal',
        plugins: [ ],
        babelPresets: ['es2015-rollup', 'stage-0'],
        babelPlugins: [
            //'transform-runtime'
        ],
    },
    {
        format: 'umd',
        ext: '.min.js',
        dir: 'umd',
        moduleName: 'jsignal',
        plugins: [uglify()],
        babelPresets: ['es2015-rollup', 'stage-0'],
        babelPlugins: [
            //'transform-runtime'
        ],
        minify: true
    }
];

let promise = Promise.resolve();

promise = promise.then(() => del(['dist/*']));

for (const config of bundles) {
    promise = promise
        .then(() => rollup
            .rollup({
                entry: 'src/index.js',
                external: Object.keys(pkg.dependencies || { }),
                plugins: [
                    babel({
                        babelrc: false,
                        exclude: 'node_modules/**',
                        presets: config.babelPresets,
                        plugins: ['external-helpers', 'transform-runtime'].concat(config.babelPlugins),
                        externalHelpers: true,
                        runtimeHelpers: true
                    })
                ].concat(config.plugins),
            })
            .then(bundle => bundle.write({
                dest: `dist/${config.dir || '.'}/${config.moduleName || 'index'}${config.ext}`,
                format: config.format,
                sourceMap: !config.minify,
                moduleName: config.moduleName,
            }))
    );
}

promise = promise.then(() => {
    delete pkg.private;
    delete pkg.devDependencies;
    delete pkg.scripts;
    delete pkg.eslintConfig;
    delete pkg.babel;
    pkg['main']        = pkg['main']       .split('/').slice(1, 3).join('/');//var pkgMain = pkg['main'].split('/').splice(0, 1).join('/');// delete pkgMain[0]; pkg['main'] = pkgMain.join('/');
    pkg['jsnext:main'] = pkg['jsnext:main'].split('/').slice(1, 3).join('/');//var pkgJsnextMain = pkg['jsnext:main'].split('/').splice(0, 1).join('/');// delete pkgJsnextMain[0]; pkg['jsnext:main'] = pkgJsnextMain.join('/');
    pkg['browser']     = pkg['browser']    .split('/').slice(1, 3).join('/');//var pkgBrowser = pkg['browser'].split('/').split('/').splice(0, 1).join('/');// delete pkgBrowser[0]; pkg['browser'] = pkgBrowser.join('/');
    pkg['module']      = pkg['module']     .split('/').slice(1, 3).join('/');//var pkgModule = pkg['module'].split('/').split('/').splice(0, 1).join('/');// delete pkgModule[0]; pkg['module'] = pkgModule.join('/');
    fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
    fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack));