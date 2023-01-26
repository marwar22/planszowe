import { BoardGame } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const boardGame = await BoardGame.findOne({ where: { id: params.boardgameid } });
    if (boardGame == null) throw redirect(300, '/');
    return { boardGame: boardGame.dataValues };
}) satisfies PageServerLoad;
