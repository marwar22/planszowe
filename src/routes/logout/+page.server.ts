import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	console.log('logout');
	throw redirect(302, '/login');
};

export const actions: Actions = {
	default({ cookies, locals }) {
		locals.user = { username: '', loggedIn: false };
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(302, '/login');
	}
};
