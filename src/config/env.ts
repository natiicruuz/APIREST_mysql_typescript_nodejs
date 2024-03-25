import dotenv from 'dotenv'

dotenv.config()

interface Env {
  PORT: string
  NODE_ENV: string
  MYSQL_HOST: string
  MYSQL_USER: string
  MYSQL_PASSWORD: string
  MYSQL_DATABASE: string
  JWT_SECRET_KEY: string

}

export const env: Env = {
  PORT: process.env.PORT ?? '3000',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MYSQL_HOST: process.env.MYSQL_HOST ?? '',
  MYSQL_USER: process.env.MYSQL_USER ?? '',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ?? '',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? ''
}
