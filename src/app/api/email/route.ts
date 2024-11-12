import {sendEmail} from "@/app/api/utils/mail.utils";

export async function POST(){
    const sender = {
        name : 'My App',
        address : 'no-reply@example.com'
    }

    const recipients = [{
        name: 'johndoe',
        address : 'john-doe@example.com'
    }]

    try {
        const result = await sendEmail({
            sender,
            recipients,
            subject: 'Email Test',
            message: 'Test Message',
        })
        return Response.json({
            accepted: result.accepted,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return Response.json({ message: error.message}, { status: 500 });
    }

}