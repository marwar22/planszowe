import { BoardGame } from '$lib/server/database';
import { s3bucketName, s3boardgames } from '$lib/server/s3';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();
        const name = data.get('name');
        const description = data.get('description');
        if (!name) return fail(400, { nameError: true });
        if (!description) return fail(400, { descriptionError: true });

        const imageUrls: string[] = [];
        const promises = [];
        for (let i = 0; true; i++) {
            const image = data.get(`image${i}`) as File;
            if (!image) break;
            const uploadPromise = uploadImage(image);
            imageUrls.push('');
            uploadPromise.then((imageUrl) => {
                imageUrls[i] = imageUrl;
            });
            promises.push(uploadPromise);
        }
        await Promise.all(promises);
        BoardGame.create({
            name,
            description,
            imageUrls
        });
    }
};

async function uploadImage(image: File) {
    const imageUUID = crypto.randomUUID();

    const re = /(?:\.([^.]+))?$/;
    const extension = re.exec(image.name)![1];
    const fileName = `${imageUUID}.${extension}`;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3boardgames
        .upload({
            Bucket: s3bucketName,
            Key: fileName,
            Body: buffer
        })
        .promise();
    return `https://s3boardgames.s3.eu-central-1.amazonaws.com/${fileName}`;
}
