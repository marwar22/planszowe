import { BoardGame, Party } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const party = await Party.findOne({ where: { id: params.partyid } });
    if (party == null) throw redirect(300, '/');
    return { party: party.dataValues };
}) satisfies PageServerLoad;
