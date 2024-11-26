import {sendEmail} from "@/app/api/utils/mail.utils";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const sender = {
        name: 'Feastify | No Reply',
        address : process.env.EMAIL_USER
    }

    const recipients = [{
        name: 'Muhamad Daffa Azfa Rabbani',
        address : 'muhamaddaffaazfarabbani@mail.ugm.ac.id'
    }]

    try {
        const result = await sendEmail({
            sender,
            recipients,
            subject: "Verify Your Account",
            message: `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Feastify - Verify Your Account</title>
        </head>
        <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e6f7f3; width: 100%; text-align: center;">
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
                                    <p style="font-size: 14px; color: #555555; margin: 10px 0;">Click the button below to verify your account.</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="http://localhost:3000/verify/${_id}" style="display: inline-block; background-color: #79c6ae; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: bold; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Verify</a>
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
        </div>
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