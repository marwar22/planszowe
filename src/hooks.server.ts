import { BoardGame, User } from '$lib/server/database';
import type { Handle } from '@sveltejs/kit';

// import { DataTypes, Sequelize } from 'sequelize';

export const handle: Handle = async ({ event, resolve }) => {
    // const db = await connectToDB();
    // event.locals.db = db;
    // get cookies from browser
    const session = event.cookies.get('session');
    if (!session) {
        // if there is no session load page as normal
        return await resolve(event);
    }
    const user = await User.findOne({ where: { authToken: session } });

    if (user) {
        event.locals.user = {
            username: user?.dataValues.username,
            userId: user?.dataValues.id,
            email: user?.dataValues.email,
            loggedIn: true
        };
    }
    return await resolve(event);
};
