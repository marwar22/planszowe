import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    throw redirect(302, '/login');
};

export const actions: Actions = {
    default({ cookies, locals }) {
        locals.user = { username: '', userId: -1, loggedIn: false };
        cookies.set('session', '', {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0)
        });
        throw redirect(302, '/login');
    }
};
