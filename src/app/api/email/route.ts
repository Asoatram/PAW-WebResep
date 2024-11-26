import {sendEmail} from "@/app/api/utils/mail.utils";
import {NextRequest, NextResponse} from "next/server";

interface emailBody{
    email: string;
    name: string;
    _id: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const sender = {
        name: 'Feastify | No Reply',
        address : process.env.EMAIL_USER as string
    }

    const {name , email, _id}:emailBody = await req.json();
    if (!name || !email || !_id) {
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const recipients = [{
        name: name,
        address : email
    }]

    try {
        const result = await sendEmail({
            sender,
            recipients,
            subject: "Welcome to Feastify",
            message: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Feastify - Verify Your Account</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e6f7f3; width: 100%; text-align: center;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e6f7f3; padding: 20px 0;">
                <tr>
                    <td align="center">
                        <table cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; max-width: 400px; width: 100%; padding: 20px; text-align: center;">
                            <tr>
                                <td>
                                    <!-- Replace with your logo URL -->
                                    <img src="https://res.cloudinary.com/ddrnhafts/image/upload/v1732552295/a5o9bhnjw8cx424ygmqa.png" alt="Feastify Logo" style="width: 80px; height: auto; margin-bottom: 20px;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1 style="font-size: 20px; color: #333333; margin: 0 0 10px;">Feastify</h1>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style="font-size: 14px; color: #555555; margin: 10px 0;">
                                        Welcome to Feastify! 🌟
                                    </p>
                                    <p style="font-size: 14px; color: #555555; margin: 10px 0;">
                                        Your ultimate platform to <b>share recipes</b> with the world, <b>explore flavors</b>, and <b>connect</b> with fellow food enthusiasts.
                                    </p>
                                    <p style="font-size: 14px; color: #555555; margin: 10px 0;">
                                        Dive into the Feastify community where every dish tells a story and every recipe is a gateway to new culinary adventures.
                                    </p>
                                    <p style="font-size: 14px; color: #555555; margin: 10px 0;">
                                        ✨ <b>Discover, Create, Share.</b><br>
                                        Ready to make your mark? 🍴
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style="font-size: 12px; color: #999999; margin: 20px 0 0;">This isn’t you?</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style="font-size: 14px; color: #555555; margin: 10px 0;">Explore Flavors, One Recipe at a Time.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `,
        });



        return Response.json({message: "Email send"}, {status: 200});

    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Response.json({ message: error.message}, { status: 500 });
    }

}