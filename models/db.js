const { MongoClient } = require('salvage.db');
const db = new MongoClient({
    schema: {
        name: 'UserID'
    },
    mongoURI: "mongodb+srv://USERNAME:wRzt2R78qnhgsa31@USERNAME.ogu5a.gcp.mongodb.net/userID?retryWrites=true&w=majority"
})
module.exports = db;