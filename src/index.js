require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const app = express();


app.use(express.json());
app.use(cookieParser());

//Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/instruments", require("./routes/instrumentRoutes"));
app.use("/api/central-lab", require("./routes/centralLabRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));
app.use("/api/raw-material", require("./routes/rawMaterialRoutes"));
app.use("/api/test", require("./routes/testRoutes"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


