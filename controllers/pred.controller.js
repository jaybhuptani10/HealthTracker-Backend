const { sendEmail } = require("../services/email.services");

module.exports.fallRisk = async (req, res, next) => {
    try {
        const { email, fallDetected } = req.body;

        if (!email || fallDetected === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (fallDetected) {
            console.log(`⚠️ Fall detected`);
            await sendEmail(email, "Fall detected", "A fall has been detected");
            await sendEmail("jaybhuptani1054@gmail.com", "Fall detected", "A fall has been detected");
            // Here you can add logic to send alerts, store data, etc.
        }

        res.status(200).json({ message: "Fall data received successfully" });
    } catch (error) {
        console.error("Error processing fall detection:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
