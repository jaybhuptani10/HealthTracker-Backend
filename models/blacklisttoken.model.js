const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        
    }
});

module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);