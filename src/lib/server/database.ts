import { Client, Pool, type QueryResult } from 'pg';
import { DataTypes, Sequelize } from 'sequelize';
// const client = new Client();
// await client.connect();

// const res = await client.query('SELECT $1::text as message', ['Hello world!']);
// console.log('xd');
// console.log(res.rows[0].message);
// await client.end();

// const database = import.meta.env.VITE_PGDATABASE;
// const user = import.meta.env.VITE_PGUSER;
// const host = import.meta.env.VITE_PGHOST;
// const password = import.meta.env.VITE_PGPASSWORD;
// const port = Number(import.meta.env.VITE_PGPORT || 5432);
// const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;
// const pool = new Pool({
// 	connectionString: connectionString,
// 	database: database,
// 	user: user,
// 	host: host,
// 	password: password,
// 	port: Number(port || 5432)
// });
// export const connectToDB = async () => await pool.connect();
// type PostgresQueryResult = (sql: string, params?: any[]) => Promise<QueryResult<any>>;
// export const query: PostgresQueryResult = (sql, params?) => pool.query(sql, params);

// export const connectToDB = async () => await pool.connect();

const database = import.meta.env.VITE_PGDATABASE;
const user = import.meta.env.VITE_PGUSER;
const host = import.meta.env.VITE_PGHOST;
const password = import.meta.env.VITE_PGPASSWORD;
const port = Number(import.meta.env.VITE_PGPORT || 5432);

export const sequelize = new Sequelize(
	`postgres://${user}:${password}@${host}:${port}/${database}`
);
sequelize
	.authenticate()
	.then(() => {
		console.log(`Database connected`);
	})
	.catch((err) => {
		console.log(`Database connection error ${err}`);
	});

export const User = sequelize.define(
	'User',
	{
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		authToken: {
			type: DataTypes.STRING
		}
	},
	{ freezeTableName: true }
);

export const BoardGame = sequelize.define(
	'BoardGame',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		freezeTableName: true
	}
);
await sequelize.sync();