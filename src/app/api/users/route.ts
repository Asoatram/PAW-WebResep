
import {SignJWT} from 'jose';
import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";


export async function POST(req: NextRequest) {
    await connectDB(); // Connect to the database


    try {
        const {username, email, password} = await req.json(); // Parse the JSON body

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND as string));
        const user = new User({
            username,
            email,
            password: hashedPassword, // Note: You should hash the password before saving it
        });

        // Save the user to the database
        await user.save();

        const userRegistered = await User.findOne({username, email}).select('_id username email user_id');

        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

        const accessToken = await new SignJWT({username, email, hashedPassword, id: userRegistered.user_id}).setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(secret);
        console.log(accessToken);
        const response = NextResponse.json({message: 'User created successfully', accessToken : accessToken, user: userRegistered}, {status: 201});
        response.cookies.set(
            'token', accessToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60, // 1 hour
            });


        // Return a success response
        return response;
    } catch (e) {
        if(e instanceof Error) {
            console.error('Error creating user:', e);
            return NextResponse.json({message: 'Error creating user', error: e.message}, {status: 500});
        } else {
            console.error("Unknown error occured");
            return NextResponse.json({message: 'Error creating user'}, {status: 500})
        }
    }


}