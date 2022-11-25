const HOST = "0.0.0.0";

const PORT = 8000;

const PG_CONFIG = {
  username: process.env.PG_USERNAME || "librate",
  password: process.env.PG_PASSWORD || "Librate2022",
  database: process.env.PG_DATABASE || "literate",
  host:
    process.env.PG_HOST ||
    "literate.ci3ljp90yw4z.ap-southeast-1.rds.amazonaws.com",
  port: process.env.PG_PORT || "5432",
  dialect: "postgres",
  logging: false,
  timestamps: true,
  sync: {
    force: true,
  },
};

const JWT_PRIVATE_KEY = "yUfLQdAgyj+9Qkx";

const ADMIN_ID = "88785352-c404-4546-8bd9-8efedbe9182f";

module.exports = {
  PG_CONFIG,
  HOST,
  PORT,
  JWT_PRIVATE_KEY,
  ADMIN_ID,
};
