import type { UserInfo } from '../app';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (async ({ locals }) => {
    const userInfo: UserInfo = locals.user ?? {
        username: '',
        loggedIn: false,
        email: '',
        userId: -1
    };
    return { userInfo };
}) satisfies LayoutServerLoad;
