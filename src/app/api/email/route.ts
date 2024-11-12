import {sendEmail} from "@/app/api/utils/mail.utils";

export async function POST(){
    const sender = {
        name : 'My App',
        address : 'hello@demomailtrap.com'
    }

    const recipients = [{
        name: 'Muhamad Daffa Azfa Rabbani',
        address : 'muhamaddaffaazfarabbani@mail.ugm.ac.id'
    }]

    try {
        const result = await sendEmail({
            sender,
            recipients,
            subject: 'Email Test',
            message: '<head>\n' +
                '    <meta charset="UTF-8">\n' +
                '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                '    <title>Feastify - Verify Your Account</title>\n' +
                '<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> \n' +
                '    <style>\n' +
                '        body {\n' +
                '            margin: 0;\n' +
                '            padding: 0;\n' +
                '            font-family: "Poppins", serif;\n' +
                '            background-color: #e6f7f3;\n' +
                '            display: flex;\n' +
                '            justify-content: center;\n' +
                '            align-items: center;\n' +
                '            height: 100vh;\n' +
                '        }\n' +
                '\n' +
                '        .container {\n' +
                '            background-color: white;\n' +
                '            border-radius: 10px;\n' +
                '            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n' +
                '            padding: 2rem;\n' +
                '            max-width: 400px;\n' +
                '            text-align: center;\n' +
                '        }\n' +
                '\n' +
                '        .logo {\n' +
                '            width: 80px;\n' +
                '            margin-bottom: 1rem;\n' +
                '        }\n' +
                '\n' +
                '        h1 {\n' +
                '            font-size: 1.5rem;\n' +
                '            margin: 0;\n' +
                '        }\n' +
                '\n' +
                '        p {\n' +
                '            font-size: 1rem;\n' +
                '            color: #555;\n' +
                '            margin: 0.5rem 0;\n' +
                '        }\n' +
                '\n' +
                '        .button {\n' +
                '            background-color: #79c6ae;\n' +
                '            color: white;\n' +
                '            border: none;\n' +
                '            font-family: "Poppins", serif;\n' +
                '            padding: 0.75rem 1.5rem;\n' +
                '            border-radius: 5px;\n' +
                '            font-size: 1rem;\n' +
                '            cursor: pointer;\n' +
                '            margin-top: 1rem;\n' +
                '            transition: background-color 0.3s;\n' +
                '        }\n' +
                '\n' +
                '        .button:hover {\n' +
                '            background-color: #5fa48d;\n' +
                '        }\n' +
                '\n' +
                '        .small-text {\n' +
                '            color: #999;\n' +
                '            font-size: 0.875rem;\n' +
                '            margin-top: 0.5rem;\n' +
                '        }\n' +
                '    </style>\n' +
                '</head>\n' +
                '\n' +
                '<body>\n' +
                '    <div class="container">\n' +
                '        <img src="https://www.svgrepo.com/show/530384/food.svg" alt="Feastify Logo" class="logo">\n' +
                '        <h1>Feastify</h1>\n' +
                '        <p>Click the button to verify your account</p>\n' +
                '        <p class="small-text">This isn’t you?</p>\n' +
                '        <p>Explore Flavors, One Recipe at a Time</p>\n' +
                '        <button class="button">Verify</button>\n' +
                '    </div>\n' +
                '</body>',
        })
        return Response.json({
            accepted: result.accepted,
        })
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Response.json({ message: error.message}, { status: 500 });
    }

}