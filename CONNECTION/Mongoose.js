const mongoose = require('mongoose');

async function connect() {
    try {
        const uri = process.env.CONN_STR;
        await mongoose.connect(uri);
    } catch(error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = { mongoose, connect };
