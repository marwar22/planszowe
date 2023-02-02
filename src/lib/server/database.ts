import { DataTypes, Sequelize } from 'sequelize';

const database = import.meta.env.VITE_PGDATABASE;
const user = import.meta.env.VITE_PGUSER;
const host = import.meta.env.VITE_PGHOST;
const password = import.meta.env.VITE_PGPASSWORD;
const port = Number(import.meta.env.VITE_PGPORT || 5432);

export const sequelize = new Sequelize(
    `postgres://${user}:${password}@${host}:${port}/${database}`,
    { logging: false }
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
export const UserFriend = sequelize.define(
    'UserFriend',
    {},
    {
        freezeTableName: true,
        timestamps: false
    }
);
User.belongsToMany(User, { as: 'Friend', through: UserFriend });
export const BoardGame = sequelize.define(
    'BoardGame',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        rulesUrl: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true
    }
);

export const Party = sequelize.define(
    'Party',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        emailSent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true
    }
);
export const UserParty = sequelize.define(
    'UserParty',
    {},
    {
        freezeTableName: true,
        timestamps: false
    }
);

User.belongsToMany(Party, { through: 'UserParty' });
Party.belongsToMany(User, { through: 'UserParty' });

export const BoardgameParty = sequelize.define(
    'BoardgameParty',
    {},
    {
        freezeTableName: true,
        timestamps: false
    }
);

BoardGame.belongsToMany(Party, { through: 'BoardgameParty' });
Party.belongsToMany(BoardGame, { through: 'BoardgameParty' });

await sequelize.sync();
