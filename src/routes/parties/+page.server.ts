import { Party } from '$lib/server/database';
import { findUserParties } from '$lib/server/parties';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.user?.loggedIn) throw redirect(302, '/login');
    const userId = locals.user.userId;
    const parties = await findUserParties(userId);
    return { parties };
}) satisfies PageServerLoad;
