import { UserFriend } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ url, locals, request }) => {
    const userId = locals.user?.userId;
    if (!userId) return new Response();
    const { friendId } = await request.json();
    UserFriend.create({
        UserId: userId,
        FriendId: friendId
    });
    return new Response();
}) satisfies RequestHandler;
