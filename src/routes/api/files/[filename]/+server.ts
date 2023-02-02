import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
    const userId = locals.user?.userId;
    const s3Url = `https://s3boardgames.s3.eu-central-1.amazonaws.com`;

    const re = /([^\/]+$)/;
    const filename = re.exec(url.pathname)![0];
    const file = await fetch(`${s3Url}/${filename}`).then((res) => res.arrayBuffer());
    return new Response(file);
}) satisfies RequestHandler;
