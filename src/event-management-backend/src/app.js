const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");
const config = require("./config/config");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");
const logger = require("./utils/logger");

const app = express();

connectDB();

//Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//Routes
app.use("/api", routes);

//Error Handling
app.use(errorHandler);

//Start Server
app.listen(config.port, () => {
  logger.info(`Server started on port ${config.port}`);
});

module.exports = app;
