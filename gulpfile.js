const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const imagemin = require ('gulp-imagemin')
const webp = require ('gulp-webp')
const webphtml = require('gulp-webp-html')
const svgsprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const gulpBabel = require('gulp-babel')
const gulpUglify = require('gulp-uglify')
const del = require('del')
const sync = require('browser-sync').create()
// import imagemin from 'gulp-imagemin';
function html(){
    return src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(webphtml())
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/index.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

// function js(){
//     return src('src/js/index.js')
//     .pipe(include({
//         prefix: '@@'
//     }))
//         .pipe(gulpBabel())
//         .pipe(gulpUglify())
//     .pipe(dest('dist/js/'))
//     }

// function sprite() {
//     return src ('src/images/icon/**.svg')
//     .pipe(svgsprite({
//         mode: {
//             stack: {
//                 sprite: "sprite.svg",
//                 // example: true
//             }
//         },
//     }))
//     .pipe(dest('dist/images/sprite'))
// }

function sprite() {
    return src('src/images/icon/*.svg')
    .pipe(svgmin({
    js2svg: {
    pretty: true
    }
    }))
    .pipe(cheerio({
    run: function ($) {
    $('[fill]').removeAttr('fill');
    $('[stroke]').removeAttr('stroke');
    $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgsprite({
    mode: {
    stack: {
    sprite: "sprite.svg",
    }
    } 
    }))
    .pipe(dest('dist/images/sprite/'));
    } 

function clear() {
    return del('dist')
}

function images() {
    return src('src/images/**/*.{jpg,png,jpeg}',
    '!src/images/sprite/*'
    )

    .pipe(
        webp ({
            quality: 70
        })
    )
    .pipe(dest('dist/images'))

    .pipe(src('src/images/**/*.{jpg,png,jpeg}',
    '!src/images/sprite/*'
    ))

    .pipe(imagemin(
    {
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3 //0 to7 
    }
    ))
    .pipe(dest('dist/images'))
}

function media(){
    return src('src/media/**')
    .pipe(dest('dist/media'))
}

function font(){
    return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
}

function serve() {
    sync.init({
        server: './dist'
    })
    watch('src/**/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
}
exports.build = series(clear, scss, html, images, sprite, media, font)
exports.serve = series(clear, scss, html, images, sprite, media, font, serve)
exports.clear = clear