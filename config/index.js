(function() {
    "use strict";

    process.env.NODE_ENV = process.env.NODE_ENV || "local";
    process.env.PORT = process.env.PORT || 4004;
    process.env.HOST = process.env.HOST || "127.0.0.1";

    let config = {
        web_server: {
            host: process.env.HOST,
            port: process.env.PORT
        },
        database: {
            host: "localhost",
            user: "vaibhav",
            password: "Machines",
            database: "inventory"
        },
        jwt_secret: "BotGateway"
    };

    if (process.env.NODE_ENV === "production") {
        config = {
            web_server: {
                host: process.env.HOST,
                port: process.env.PORT
            },
            database: {
                host: "localhost",
                user: "vaibhav",
                password: "Machines",
                database: "inventory"
            },
            jwt_secret: "BotGateway"
        };
    }

    module.exports = config;
})();
