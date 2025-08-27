import {
  loadEnv,
  defineConfig,
  ModuleRegistrationName,
} from "@medusajs/framework/utils";
loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions:
      process.env.NODE_ENV !== "development"
        ? { connection: { ssl: { rejectUnauthorized: false } } }
        : {},
    sessionOptions: {
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
    },
    cookieOptions: {
      secure: false,
      httpOnly: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/ntfy",
            id: "ntfy",
            options: {
              channels: ["ntfy"],
              notification_url: process.env.NTFY_URL,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/file",
      key: ModuleRegistrationName.FILE,
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/event-bus-redis",
      key: ModuleRegistrationName.EVENT_BUS,
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/cache-redis",
      key: ModuleRegistrationName.CACHE,
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              automatic_payment_methods: true,
            },
          },
        ],
      },
    },
  ],
});
