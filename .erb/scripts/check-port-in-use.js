import detectPort from 'detect-port';

const port = process.env.PORT || '1212';
const redMessage = (message) =>
  `\u001b[97m\u001b[41m\u001b[1m${message}\u001b[0m`;

detectPort(port, (_err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      redMessage(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`,
      ),
    );
  } else {
    process.exit(0);
  }
});
