import { User } from '$lib/server/database';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user?.loggedIn) {
		console.log('redirect');
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { invalid: true });
		}
		let user;
		try {
			user = await User.findOne({ where: { username } });
		} catch (e) {
			console.log(e);
			return fail(400, { credentialsError: true });
		}
		if (!user) return fail(400, { credentialsError: true });
		const userPassword = bcrypt.compareSync(password, user?.dataValues.password);
		if (!userPassword) return fail(400, { credentialsError: true });

		const authToken = crypto.randomUUID();
		await User.update({ authToken }, { where: { username } });
		cookies.set('session', authToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30 // month
		});
		throw redirect(302, '/');
	}
};
