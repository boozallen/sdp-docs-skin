const {src, dest, task, series, parallel, watch, } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('cssnano'); 
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')
const concat = require('gulp-concat');
const del = require('del'); 
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const { obj: map } = require('through2');
const fs = require('fs-extra')
const zip = require('gulp-zip');
const sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');


const srcDir = "./src"
const bundleName = 'ui'
const bundleDir = "./build"
const previewDir ="./public"
const previewSrcDir = 'preview-src'
const previewDestDir = 'public'
const destDir = `${previewDestDir}/_`

const lib = require('./gulp.d/tasks/build-preview-pages.js')

// clean up build dir and preview site
async function clean(){
    del.sync([ bundleDir, previewDir ]);
    await Promise.resolve();
}

// compile scss into css
async function css() {
    src(`${srcDir}/scss/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [ './node_modules' ]
        }).on('error', sass.logError)) 
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(concat('site.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${destDir}/css`))
        .pipe(browserSync.stream());
    
    await Promise.resolve();
}

// minify JS 
async function js() {
    src(`${srcDir}/js/**/*.js`)
        .pipe(sourcemaps.init())
        .pipe(concat('site.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${destDir}/js`))
    await Promise.resolve();
}

async function helpers(){
    src(`${srcDir}/helpers/**/*.js`).pipe(dest(`${destDir}/helpers`))
    await Promise.resolve();
}

async function handlebars(){
    src(`${srcDir}/{layouts,partials}/**/*.hbs`).pipe(dest(`${destDir}`))
    await Promise.resolve();
}

async function img() {
    src(`${srcDir}/img/**/*.{gif,ico,jpg,png,svg}`)
      .pipe(imagemin([
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
      ].reduce((accum, it) => it ? accum.concat(it) : accum, [])))
      .pipe(dest(`${destDir}/img`));
    await Promise.resolve();
}

async function buildPreviewPages() {
    lib.build(srcDir, previewSrcDir, previewDestDir)
    await Promise.resolve();
}

async function previewBuild(){
    exports.build();
    buildPreviewPages(); 
    await Promise.resolve();
}

async function pack(){
    console.log('packing')
    src(`${destDir}/**/*`)
    .pipe(debug())
    .pipe(zip('ui-bundle.zip'))
    .pipe(dest(bundleDir))

    await Promise.resolve();
}

function reload(){
    return browserSync.reload(); 
}

function serve() {
    browserSync.init({
        server: {
            baseDir: previewDestDir,
        },
        files: [ `${previewDestDir}/_/js/vendor/**/*.js` ],
        notify: false
    })
    watch(`${srcDir}/scss/**/*.scss`, css)
    watch(`${srcDir}/**/*.{hbs,js}`).on('change', series(previewBuild, reload))
    watch(`${previewSrcDir}/**/*`).on('change', series(previewBuild, reload))
}

exports.clean = clean; 
exports.build = series(js, css, img, helpers, handlebars); 
exports.bundle = series(js, css, img, helpers, handlebars, pack);
exports.preview = series(clean, previewBuild, serve);  
exports.buildPreviewPages = buildPreviewPages; 
