var elixir = require('laravel-elixir');
var gulp = require('gulp')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel');

elixir.config.assetsPath = "src"
elixir.config.publicPath = "dist"
elixir.config.js.folder = "lib"

elixir.config.browserSync = {
    open: false,
    server: {
        baseDir: "./dist",
        directory: true,
        index: "index.html",
        https: true
    },
    watchOptions: {
        ignoreInitial: true,
        ignored: '*.txt'
    },
    files: ['./dist']
};

elixir(function(mix) {
    mix.copy('src/index.html', 'dist/index.html');
});

elixir(function(mix) {
    mix.sass('index.scss');
});



elixir(function(mix) {
    mix.browserSync();
});


//New Task
var Task = elixir.Task;

elixir.extend("crullop", function() {
    console.log(babel)
    new Task("crullop", function() {
        return rollup.rollup({
                entry: "./src/lib/app.js",
                treeshake: false,
                plugins: [
                    babel({
                        exclude: 'node_modules/**'
                    })
                ]
            })
            .then(function(bundle) {
                bundle.write({
                    format: "umd",
                    moduleName: "library",
                    dest: "./dist/js/app.js",
                    sourceMap: true
                });
            })
    }).watch("src/**");
});


elixir(function(mix) {
    mix.crullop()
});
