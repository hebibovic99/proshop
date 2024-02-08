const developmentEnvironment = {
    url: "http://localhost/ademir/api",
    description: "Development Environment"
};

const apiKeyAuth = {
    securityScheme: "ApiKeyAuth",
    type: "apiKey",
    in: "header",
    name: "Authorization"
};
