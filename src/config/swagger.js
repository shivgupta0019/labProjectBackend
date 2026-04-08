const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Lab Management API",
            version: "1.0.0"
        },
        servers: [
            { url: "http://localhost:3000" }
        ]
    },
    components: {
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "token"
            }
        }
    },
    security: [
        {
            cookieAuth: []
        }
    ],
    apis: [path.join(__dirname, "../**/*.js")] // 🔥 FINAL FIX
};

module.exports = swaggerJsdoc(options);