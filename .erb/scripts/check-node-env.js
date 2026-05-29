const redMessage = (message) =>
  `\u001b[97m\u001b[41m\u001b[1m${message}\u001b[0m`;

export default function checkNodeEnv(expectedEnv) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      redMessage(
        `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`,
      ),
    );
    process.exit(2);
  }
}
