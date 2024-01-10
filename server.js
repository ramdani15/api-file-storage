const fs = require('fs')
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middlewares/logger');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const morgan = require('morgan');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Routes file
const files = require('./routes/files');

// Load env vars
dotenv.config({ path: './config/.env' });

// Custom Middleware
// app.use(logger);

// Create Logger file
// app.use(morgan('dev'));
let today = new Date();
let fileName = process.env.NODE_ENV + '-' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.log';
let accessLogStream = fs.createWriteStream(path.join(__dirname + "/logs", fileName), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

// File uploading
app.use(fileupload());

// Set security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Swagger config
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API File Storage",
        version: "0.0.1",
        description:
            "This is a simple API for uploading and getting files.",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
            name: "Ramdani",
            url: "https://github.com/ramdani15",
            email: "ramdaninformatika@gmail.com",
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
// TODO: refactor routes versioning
app.use('/api/v1/files', files);
app.use("/api/v1/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);

    // Close server & exit process
    server.close(() => process.exit(1));
})