import twilio from "twilio"

const accountSid = process.env.ACCOUNTSID; 
const authToken = process.env.AUTHTOKEN; 
const client = twilio(accountSid, authToken); 

try {
    const messege = await client.messages.create({
        body:'Notificacion de nuevo registro',
        from: '',
        to: ''
    })
    console.log(messege);
} catch (error) {
    console.log(error);
}