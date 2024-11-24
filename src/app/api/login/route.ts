import type { NextApiRequest } from 'next';
import {sign} from 'jsonwebtoken';
import {NextResponse} from "next/server";



export async function POST(req: NextApiRequest) {

    try{
        const username = req.body.username;
        const password = req.body.password;
        const user = {username : username, password: password};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const secret:string = process.env.ACCESS_TOKEN_SECRET;

        const accessToken = sign(user, secret);
        const response = NextResponse.json({accessToken : accessToken, status: 200});
        response.cookies.set(
            'token', accessToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60, // 1 hour
            });

        // Put this in the login page if you want to use authorization
        // localStorage.setItem('Authorization', accessToken);

        return response;
    } catch (e) {
        return NextResponse.json({ error: 'Failed to authenticate user', details: e} ,{ status: 400});
    }

}