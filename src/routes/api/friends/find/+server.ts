import { findPotentialFriends } from '$lib/server/friends';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
    const userId = locals.user?.userId;
    if (!userId) return new Response(JSON.stringify([]));
    const username = url.searchParams.get('username') ?? '';
    const users = await findPotentialFriends(userId, 5, username);
    return new Response(JSON.stringify(users));
}) satisfies RequestHandler;
