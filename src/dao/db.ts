import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Loan } from './entities/Loan';

const AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: 'loans.sql',
    entities: [Loan],
    synchronize: true,
});

export { AppDataSource };
