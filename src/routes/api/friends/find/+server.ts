import { User, UserFriend } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
    const userId = locals.user?.userId;
    if (!userId) return new Response(JSON.stringify([]));
    const friends = await UserFriend.findAll({
        where: {
            UserId: userId
        }
    });
    const friendIds = friends.map((friend) => friend.dataValues.FriendId);
    friendIds.push(userId);

    const users = (
        await User.findAll({
            where: {
                id: { [Op.notIn]: friendIds }
            },
            limit: 5
        })
    ).map(({ dataValues }) => {
        const { id, username } = dataValues;
        return { id, username };
    });

    return new Response(JSON.stringify(users));
}) satisfies RequestHandler;
