To test the expo project all cliqz components have to be copied to node_modules as react-native bundler does not support symlinks. To do this job easier run `npm run link` it will start `wml` which links packages automatically.

Remember to run `npm run build` in `cliqz-components` parent project.

There is no support for life reloading yet. You have to run `npm run build` on every change.
