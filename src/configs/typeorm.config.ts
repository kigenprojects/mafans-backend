import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { stringify } from "querystring";
dotenv.config();


export const typeORMconfig: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_TYPE as 'postgres',
  port: parseInt(process.env.TYPEORM_PORT, 10),
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
}