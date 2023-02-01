import { findBoardGamesIn } from '$lib/server/boardgames';
import { BoardGame, BoardgameParty, Party, User, UserParty } from '$lib/server/database';
import { findFriendsIn } from '$lib/server/friends';
import { sendEmail } from '$lib/server/ses';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { Attachment } from 'nodemailer/lib/mailer';
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
    const boardgames = (await BoardGame.findAll()).map(({ dataValues }: any) => {
        const { id, name } = dataValues;
        return { id, name };
    });

    return { friends, boardgames };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();

        const name = data.get('name');
        const description = data.get('description');
        const sendEmails = data.get('sendemails') === 'on';
        const date = data.get('date') as string;

        if (!name) return fail(400, { nameError: true });
        if (!description) return fail(400, { descriptionError: true });
        if (!date) return fail(400, { dateError: true });

        const friendIds = [];
        const boardgameIds = [];
        for (const [key, value] of data.entries()) {
            if (key.startsWith('friend') && value === 'on')
                friendIds.push(Number.parseInt(key.slice(6)));
            if (key.startsWith('boardgame') && value === 'on')
                boardgameIds.push(Number.parseInt(key.slice(9)));
        }
        const userId = locals.user!.userId;
        const friends = await findFriendsIn(userId, friendIds);
        const boardgames = await findBoardGamesIn(boardgameIds);
        const party = await Party.create({
            name,
            description,
            date: new Date(date),
            emailSent: sendEmails
        });

        let participantsHTML = `<ul>`;
        participantsHTML += `<li>${locals.user!.username}</li>`;
        for (const friend of friends) {
            UserParty.create({ UserId: friend.id, PartyId: party.dataValues.id });
            participantsHTML += `<li>${friend.username}</li>`;
        }
        participantsHTML += `</ul>`;
        let boardgamesHTML = `<ul>`;
        for (const boardgame of boardgames) {
            BoardgameParty.create({ BoardGameId: boardgame.id, PartyId: party.dataValues.id });
            boardgamesHTML += `<li>${boardgame.name}</li>`;
        }
        boardgamesHTML += `</ul>`;

        if (sendEmails) {
            const emails = friends.map((friend) => friend.email);
            emails.push(locals.user!.email);
            const attachmentPromises: Promise<Attachment>[] = [];
            for (const boardgame of boardgames) {
                if (!boardgame.rulesUrl) continue;
                const filePromise = fetch(boardgame.rulesUrl);
                const promise = filePromise.then(async (res) => {
                    const re = /(?:\.([^.]+))?$/;
                    const extension = re.exec(boardgame.rulesUrl)![1];
                    return {
                        content: Buffer.from(await res.arrayBuffer()),
                        filename: `RULES_${boardgame.name}.${extension}`
                    };
                });
                attachmentPromises.push(promise);
            }
            const attachments = await Promise.all(attachmentPromises);
            const body = `${locals.user?.username} invited you to "${name}" on ${date}.<br><h2>Board Games</h2>${boardgamesHTML}<h2><h2>Participants</h2>${participantsHTML}<h2>Description</h2>${description}`;
            try {
                console.log(
                    `sending EMAIL to ${JSON.stringify(emails)} with ${JSON.stringify(boardgames)}`
                );
                console.log(attachments, emails);
                sendEmail(emails, `Invitation to ${name}`, body, attachments);
            } catch (e) {
                console.log(`ERROR while sending email to ${JSON.stringify(emails)}\n${e}`);
            }
        }
        throw redirect(302, `/parties/${party.dataValues.id}`);
    }
};
