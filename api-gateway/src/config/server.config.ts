export const serverSettings = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 3000,
};

export const orderServiceSettings = {
  host: process.env.ORDER_SERVICE_HOST || '127.0.0.1',
  port: Number(process.env.ORDER_SERVICE_PORT) || 3001,
};

export const paymentServiceSettings = {
  host: process.env.PAYMENT_SERVICE_HOST || '127.0.0.1',
  port: Number(process.env.PAYMENT_SERVICE_PORT) || 3002,
};
