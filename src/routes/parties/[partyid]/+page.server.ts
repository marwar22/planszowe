import { BoardGame, Party, User } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const party = (
        await Party.findOne({
            include: [
                { model: User, through: { as: 'UserParty' } },
                { model: BoardGame, through: { as: 'BoardGameParty' } }
            ],
            where: { id: params.partyid }
        })
    )?.dataValues;

    party.Users = party.Users.map(({ dataValues: { username } }: any) => {
        return { username };
    });
    party.BoardGames = party.BoardGames.map(({ dataValues: { id, name } }: any) => {
        return { id, name };
    });
    if (party == null) throw redirect(300, '/');

    return { party };
}) satisfies PageServerLoad;
