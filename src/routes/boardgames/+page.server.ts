import { BoardGame } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const boardGames = (await BoardGame.findAll()).map((boardGame) => boardGame.dataValues);
    return { boardGames };
}) satisfies PageServerLoad;
