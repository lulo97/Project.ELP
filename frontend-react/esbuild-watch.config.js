const esbuild = require('esbuild');

async function startBuild() {
  try {
    // Create a build context
    const ctx = await esbuild.context({
      entryPoints: ['src/main.jsx'],
      bundle: true,
      outfile: 'dist/bundle.js',
      sourcemap: true,
      minify: false,
      jsx: 'automatic',
      define: { 'process.env.NODE_ENV': '"development"' },
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
    });

    // Start watching for changes
    await ctx.watch();
    console.log('Watching for changes...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startBuild();
