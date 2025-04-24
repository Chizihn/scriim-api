interface Settings {
  PORT: string;
  MONGO_URI: string;
  VERCEL_URL: string;
  TERMII_API_KEY: string;
  TERMIN_SEKRET_KEY: string;
  EMAIL_HOST: string;
  EMAIL_PORT: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  EMAIL_FROM: string;
}

const settings: Settings = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  VERCEL_URL: process.env.VERCEL_URL as string,
  TERMII_API_KEY: process.env.TERMII_API_KEY as string,
  TERMIN_SEKRET_KEY: process.env.TERMIN_SEKRET_KEY as string,
  EMAIL_HOST: process.env.EMAIL_HOST as string,
  EMAIL_PORT: process.env.EMAIL_PORT as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASS: process.env.EMAIL_PASS as string,
  EMAIL_FROM: process.env.EMAIL_FROM as string,
};

export default settings;
