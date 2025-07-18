import z from 'zod';

const envSchema = z.object({
  MONGO_URI: z.string(),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_DB: z.string(),
  MONGO_HOST: z.string(),
  MONGO_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
});

export const envValidation = (config: Record<string, unknown>) => {
  const parsedConfig = envSchema.safeParse(config);

  console.log(parsedConfig);

  if (!parsedConfig.success) {
    console.error('Invalid environment variables:', parsedConfig.error.message);
    process.exit(1); // Exit the application if validation fails
  }

  return parsedConfig.data;
};

export type EnvType = z.infer<typeof envSchema>;
