import pgPromise, { IDatabase, IMain } from 'pg-promise';

const pgp: IMain = pgPromise();
const db: IDatabase<{}> = pgp('postgres://csc667user:csc667@localhost:5432/csc667db');

export default db;
