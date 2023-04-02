import Twilio from "twilio";

const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;

const twilioAuth = {
  ACCOUNTSID,
  AUTHTOKEN,
};

const client = Twilio(twilioAuth.ACCOUNTSID, twilioAuth.AUTHTOKEN);

export default client.messages;