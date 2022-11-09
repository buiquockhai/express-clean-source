const HOST = "0.0.0.0";

const PORT = 8000;

const PG_CONFIG = {
  username: process.env.PG_USERNAME || "postgres",
  password: process.env.PG_PASSWORD || "123456",
  database: process.env.PG_DATABASE || "LearnAndDo",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || "5432",
  dialect: "postgres",
  logging: false,
  timestamps: true,
  sync: {
    force: true,
  },
};

const JWT_PRIVATE_KEY = "yUfLQdAgyj+9Qkx";

module.exports = {
  PG_CONFIG,
  HOST,
  PORT,
  JWT_PRIVATE_KEY,
};
