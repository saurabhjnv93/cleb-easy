import Twilio from 'twilio';

const client = Twilio(process.env.WHATSAPP_SERVICE_SID, process.env.WHATSAPP_AUTH_TOKEN);

export const sendWhatsAppMessage = async (to, message) => {
  return client.messages.create({
    from: process.env.WHATSAPP_SENDER,
    to,
    body: message
  });
};
