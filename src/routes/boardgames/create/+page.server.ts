import { BoardGame } from '$lib/server/database';
import { s3bucketName, s3boardgames } from '$lib/server/s3';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = (async ({ locals }) => {
    if (!locals.user?.loggedIn) throw redirect(302, '/login');
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request, locals }) => {
        console.log('Got request');
        const data = await request.formData();
        const name = data.get('name');
        const description = data.get('description');
        if (!name) return fail(400, { nameError: true });
        if (!description) return fail(400, { descriptionError: true });

        const user = await BoardGame.findOne({ where: { name } });
        if (user) return fail(400, { nameTaken: true });

        const promises = [];
        const imageUrls: string[] = [];
        console.log('1abc');
        for (let i = 0; true; i++) {
            const image = data.get(`image${i}`) as File;
            if (!image || image.size <= 0) break;
            const uploadPromise = uploadFile(image);
            imageUrls.push('');
            uploadPromise.then((imageUrl) => {
                imageUrls[i] = imageUrl;
            });
            promises.push(uploadPromise);
        }
        let rulesUrl: string | null = null;
        const rules = data.get('rules') as File;
        console.log('2abc');
        if (rules && rules.size > 0) {
            const uploadPromise = uploadFile(rules);
            rulesUrl = '';
            uploadPromise.then((url) => {
                rulesUrl = url;
            });
            promises.push(uploadPromise);
        }
        await Promise.all(promises);
        const boardGame = await BoardGame.create({
            name,
            description,
            imageUrls,
            rulesUrl
        });
        throw redirect(302, `/boardgames/${boardGame.dataValues.id}`);
    }
};

async function uploadFile(file: File) {
    console.log('3abc uploading file');
    const fileUUID = crypto.randomUUID();

    const re = /(?:\.([^.]+))?$/;
    const extension = re.exec(file.name)![1];
    const fileName = `${fileUUID}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3boardgames
        .upload({
            Bucket: s3bucketName,
            Key: fileName,
            Body: buffer
        })
        .promise();
    console.log('4abc uploaded file');
    return `https://s3boardgames.s3.eu-central-1.amazonaws.com/${fileName}`;
}
