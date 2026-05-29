// Check if the renderer and main bundles are built
import path from 'path';
import fs from 'fs';
import { TextEncoder, TextDecoder } from 'node:util';
import webpackPaths from '../configs/webpack.paths';

const mainPath = path.join(webpackPaths.distMainPath, 'main.js');
const rendererPath = path.join(webpackPaths.distRendererPath, 'renderer.js');
const redMessage = (message: string) =>
  `\u001b[97m\u001b[41m\u001b[1m${message}\u001b[0m`;

if (!fs.existsSync(mainPath)) {
  throw new Error(
    redMessage(
      'The main process is not built yet. Build it by running "npm run build:main"',
    ),
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    redMessage(
      'The renderer process is not built yet. Build it by running "npm run build:renderer"',
    ),
  );
}

// JSDOM does not implement TextEncoder and TextDecoder
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  (
    global as typeof globalThis & { TextDecoder: typeof TextDecoder }
  ).TextDecoder = TextDecoder;
}
