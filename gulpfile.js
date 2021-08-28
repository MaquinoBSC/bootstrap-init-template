//importacion de las dependencias que ayudan a procesar los archivos sass
//y tambien para refrescar automaticamente el navegador
const gulp= require('gulp');
const browserSync= require('browser-sync');
const sass= require('gulp-sass')(require('sass'));

//asignamos tarea a gulp llamada sass
//COn esta tarea transformamos todos nuestros archivos scss para que index.html lo entienda 
gulp.task('sass', ()=> {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))//Comprimir nuestros archivos scss para que no pesen mucho y esten mimificados
  .pipe(gulp.dest('src/css'))//asignar un destino donde se guardaran los archivos css finales
  .pipe(browserSync.stream())//Cada que gup realice esta tarea el navegador se va a refrescar
});


gulp.task('js', ()=> {//como boostrap trabaja con otra libreria, con esta tarea copiamos en un nuevo destino src/js
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',//estas librerias sirven para animaciones, modals, etc
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});


//Tarea para un servidor de desarrollo
//la tarea llamada serve, va a ejecutar la tarea sass la cual es configurada anteriormente
gulp.task('serve', gulp.series('sass', ()=> {
  browserSync.init({
    server: './src'//que muestre todos lo archivos dentro de la carpeta src
  });

  gulp.watch([//todos los archivos que estan aqui, son a los cuales el browserSync va a regrescar el navegador cuando tengas cambios
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ], gulp.series('sass'));//llamamos la tarea sass para que convierta los cambios realizados

  gulp.watch('src/*.html').on('change', browserSync.reload);//ponemos a la escucha tambien de los cambios de todos los archivo html que tenga el proyecto
}));


gulp.task('font-awesome', ()=> {//Tarea para copiar los archivos de la libreria font-awesome que sirve para iconos
  return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest('src/css'))//destino de los archivos  
});

gulp.task('fonts', ()=> {//Tarea para copiar las fuentes que tiene la libreria font-awesome
  return gulp.src(['node_modules/font-awesome/fonts/*'])
  .pipe(gulp.dest('src/fonts'))
});


gulp.task('default', gulp.parallel('js', 'serve', 'font-awesome', 'fonts'));
