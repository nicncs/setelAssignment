export const serverSettings = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 3001,
};

export const paymentServiceSettings = {
  host: process.env.PAYMENT_SERVICE_HOST || '127.0.0.1',
  port: Number(process.env.PAYMENT_SERVICE_PORT) || 3002,
};

export const dbSettings = {
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/orderapp',
};
