const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio Sandbox WhatsApp Number
      to: `whatsapp:+918141242093`, // Your verified phone number
      body: message,
    });

    console.log("WhatsApp Message Sent:", response.sid);
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
};

module.exports = { sendWhatsAppMessage };
