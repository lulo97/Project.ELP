// esbuild.config.js
const esbuild = require('esbuild');

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['src/main.jsx'],
      bundle: true,
      outfile: 'dist/bundle.js',
      sourcemap: true,
      minify: false, // usually true for production
      jsx: 'automatic',
      define: { 'process.env.NODE_ENV': '"production"' },
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
    });

    console.log('Build completed successfully!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
