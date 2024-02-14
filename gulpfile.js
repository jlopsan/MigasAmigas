const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const git = require('simple-git');
const cleanCSS = require('gulp-clean-css');

function limpiarEstilos(cb) {
  return src('./styles/*', { read: false, allowEmpty: false })
    .pipe(clean());
}

function compilarSass(cb) {
  const archivosSCSS = ['./sass/styles.scss', './sass/styles2.scss', './sass/stylesProductos.scss'];
  return src(archivosSCSS)
    .pipe(sass())
    .pipe(dest('styles'));
}

function comprimirCSS(cb) {
  const archivosCSS = ['./styles/styles.css', './styles/styles2.css', './styles/stylesProductos.css'];
  return src(archivosCSS)
    .pipe(cleanCSS())
    .pipe(dest('styles'));
}

function subirGitHub(cb) {
  git()
    .add('.')
    .commit('Subida Proyecto Migas Amigas')
    .push('origin', 'main', function (err) {
      if (err) {
        console.error(err);
        cb(err);
      } else {
        cb();
      }
    });
}

exports.limpiarEstilos = limpiarEstilos;
exports.compilarSass = compilarSass;
exports.comprimirCSS = comprimirCSS;
exports.subirGitHub = subirGitHub;
exports.default = series(limpiarEstilos, compilarSass, comprimirCSS, subirGitHub);