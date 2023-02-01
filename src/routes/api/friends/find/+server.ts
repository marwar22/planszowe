import { findPotentialFriends } from '$lib/server/friends';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
    const userId = locals.user?.userId;
    if (!userId) return new Response(JSON.stringify([]));
    const users = findPotentialFriends(userId, 5);

    return new Response(JSON.stringify(users));
}) satisfies RequestHandler;
