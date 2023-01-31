import { BoardGame, User, UserFriend } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.user?.loggedIn) throw redirect(302, '/login');
    const userId = locals.user.userId;
    const user = (await User.findOne({
        include: [{ model: User, as: 'Friend', through: { as: 'UserFriend' } }],
        where: { id: userId }
    }))!.dataValues;

    const friends = user.Friend.map((friend: any) => {
        return { username: friend.dataValues.username };
    });
    return { user: { username: user.username, friends } };
}) satisfies PageServerLoad;
