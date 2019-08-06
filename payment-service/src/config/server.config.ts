export const serverSettings = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 3002,
};
