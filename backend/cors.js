const cors = require("cors");


/**
 * CORS handler utility
 * add more origins here if needed
 */
const corsConfiguration =    cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86400, // One day
})

module.exports = { corsConfiguration }