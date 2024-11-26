import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import multer from 'multer';
import { promisify } from 'util';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = promisify(upload.single('file'));

export async function POST(req) {
    try {
        // Parse the incoming form data
        const form = await req.formData();
        const file = form.get('file');

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload_stream({
            folder: 'feastify',
        }, (error, result) => {
            if (error) throw new Error(error.message);
            return result;
        }).end(Buffer.from(await file.arrayBuffer()));

        return NextResponse.json({ url: result.secure_url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
