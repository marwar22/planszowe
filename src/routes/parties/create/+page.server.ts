import { Party, User } from '$lib/server/database';
import { sendEmail } from '$lib/server/s3';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.user?.loggedIn) throw redirect(302, '/login');
    const userId = locals.user.userId;
    const user = (await User.findOne({
        include: [{ model: User, as: 'Friend', through: { as: 'UserFriend' } }],
        where: { id: userId }
    }))!.dataValues;

    const friends = user.Friend.map(({ dataValues }: any) => {
        const { id, username } = dataValues;
        return { id, username };
    });
    return { friends };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();
        const name = data.get('name');
        const description = data.get('description');
        if (!name) return fail(400, { nameError: true });
        if (!description) return fail(400, { descriptionError: true });

        sendEmail('amarcinw@gmail.com,', 'Z nodejs', 'Treść emaila <b>pogrubione?</b>');
        return;
        const party = await Party.create({
            name,
            description
        });

        throw redirect(302, `/parties/${party.dataValues.id}`);
    }
};
