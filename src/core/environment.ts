export function extractStringEnvVar(
  key: keyof NodeJS.ProcessEnv,
): string {
  const value = process.env[key];

  if (value === null || value === undefined) {
    const message = `The environment variable "${key}" cannot be "${String(value)}".`;

    throw new Error(message);
  }

  return value;
}