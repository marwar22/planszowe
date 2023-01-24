import { User } from '$lib/server/database';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const email = data.get('email');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { invalid: true });
		}
		const user = await User.findOne({ where: { username } });

		if (user) {
			return fail(400, { user: true });
		}
		const passwordHash = bcrypt.hashSync(password, 10);
		User.create({ username, password: passwordHash, email });
		// await db.user.create({
		// 	data: {
		// 		username,
		// 		passwordHash: await bcrypt.hash(password, 10),
		// 		userAuthToken: crypto.randomUUID(),
		// 		role: { connect: { name: Roles.USER } }
		// 	}
		// });

		throw redirect(303, '/login');
	}
};
