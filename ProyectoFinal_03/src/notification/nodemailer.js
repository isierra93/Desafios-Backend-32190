    import {createTransport} from "nodemailer";
    import dotenv from "dotenv";
    dotenv.config();

    const TEST_EMAIL = process.env.TEST_EMAIL;
    const TEST_PASSWORD = process.env.TEST_PASSWORD;
    const CLIENT = process.env.CLIENT;

    const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_EMAIL,
        pass: TEST_PASSWORD
    }
    });

    const message = {
    from: 'App Node Js <no-reply@exalple.com>',
    to: `"Dear Dev" ${CLIENT}`,
    subject: "Notification",
    text: "Hi dev, new register!",
    html: "<h1>Text en HTML</h1>",
    };

    try {
    const info = await transporter.sendMail(message);
    console.log(info);
    } catch (error) {
    console.log(error);
    }