const userModel = require('../models/user.model');

module.exports.createUser = async ({
    username, email, password, phoneNumber, weight, height, gender, age,
    g1name, g1phone, g1email, g2name, g2phone, g2email,
    doc, docphone, docemail
}) => {
    if (!username || !email || !password || !phoneNumber || !weight || !height ||
        !gender || !age || !g1name || !g1phone || !g1email ||
        !g2name || !g2phone || !g2email || !doc || !docphone || !docemail) {
        throw new Error('All fields are required');
    }

    // Create the user in the database
    const user = await userModel.create({
        username, email, password, phoneNumber, weight, height, gender, age,
        g1name, g1phone, g1email, g2name, g2phone, g2email,
        doc, docphone, docemail
    });

    return user;
};
