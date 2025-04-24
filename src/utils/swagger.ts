import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scriim API Documentation",
      version: "1.0.0",
      description: "API documentation for the Scriim panic alert application",
      contact: {
        name: "API Support",
        email: "support@scriim.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://scriim-api.vercel.app"
            : "http://localhost:5000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts", "./src/controllers/*.ts"],
};

// Generate the swagger specification outside of the function
// This helps avoid runtime errors in the serverless environment
const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  try {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.get("/api-docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(specs);
    });
  } catch (error) {
    console.error("Error setting up Swagger:", error);
    // Add a fallback route for Swagger UI in case it fails
    app.get("/api-docs", (req, res) => {
      res.status(500).json({
        error: "Swagger UI initialization failed",
        message:
          "Please try accessing the raw swagger definition at /api-docs.json",
      });
    });
  }
};
