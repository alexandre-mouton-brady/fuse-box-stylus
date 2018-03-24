const { resolve } = require('path');
// Fuse-Box modules, the module bundler
const { FuseBox, QuantumPlugin, WebIndexPlugin } = require('fuse-box');
// Sparky modules, the task runner
const { src, clean, task, exec, context } = require('fuse-box/sparky');

// Basically the config
context(
  class {
    config() {
      return FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        useTypescriptCompiler: true,
        cache: !this.isProd,
        target: 'browser',
        log: true,
        debug: true,
        sourceMaps: !this.isProd,
        plugins: [
          WebIndexPlugin({
            template: 'src/index.html',
            // Change the following line if you intend
            // to host your site on a subfolder
            //
            // eg: https://example.com/mysubfolder/
            // then you need `path: '/subfolder/'`
            path: '/',
          }),

          this.isProd &&
            QuantumPlugin({
              uglify: true,
              treeshake: true,
              css: { clean: true },
              bakeApiIntoBundle: 'app',
              containedAPI: true,
            }),
        ],
      });
    }
  },
);

// TASK: Clean the dist folder before building it
task('clean', async ctx => {
  await src('./dist')
    .clean('dist/')
    .exec();
});

// TASK: Copying the public folder into the root
task('copy', async ctx => {
  await src('**/**.!(js)', { base: 'public' })
    .dest('dist/')
    .exec();
});

// TASK: Dev task
task('dev', ['clean', 'copy'], async ctx => {
  ctx.isProd = false;
  const app = ctx.config();

  app.dev();

  app
    .bundle('app')
    .hmr()
    .watch()
    .instructions('> index.js');

  await app.run();
});

// TASK: Building task
task('build', ['clean', 'copy'], async ctx => {
  ctx.isProd = true;
  const app = ctx.config();

  app.bundle('app').instructions('> index.js');

  await app.run();
});
