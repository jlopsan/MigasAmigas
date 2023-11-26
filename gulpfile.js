let gulp = require('gulp');
let clean = require('gulp-clean');
let sass = require('gulp-sass')(require('sass'));
let git = require('simple-git');
let cleanCSS = require('gulp-clean-css');

gulp.task('limpiarEstilos', function() {
  return gulp.src('./styles/*', { read: false, allowEmpty: false })
    .pipe(clean());
});

gulp.task('compilarSass', function() {
    let archivosSCSS = ['./sass/styles.scss', './sass/styles2.scss', './sass/stylesProductos.scss'];
    return gulp.src(archivosSCSS)
      .pipe(sass())
      .pipe(gulp.dest('styles'));
  });

gulp.task('comprimirCSS', function() {
  let archivosCSS = ['./styles/styles.css', './styles/styles2.css', './styles/stylesProductos.css'];
  return gulp.src(archivosCSS)
    .pipe(cleanCSS())
    .pipe(gulp.dest('styles'));
});

gulp.task('subirGitHub', function (done) {
    git()
        .add('.')
        .commit('Subida Proyecto Migas Amigas')
        .push('origin', 'main', function (err) {
            if (err) {
                console.error(err);
                done(err);
            } else {
                done();
            }
        });
});

gulp.task('default', gulp.series('limpiarEstilos', 'compilarSass', 'comprimirCSS', 'subirGitHub'));