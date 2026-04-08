const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

let credential;
let client;

// Initialize Azure credentials only if environment variables are set
if (process.env.AZURE_TENANT_ID && process.env.AZURE_CLIENT_ID && process.env.AZURE_CLIENT_SECRET) {
  try {
    credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID,
      process.env.AZURE_CLIENT_ID,
      process.env.AZURE_CLIENT_SECRET
    );

    client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken("https://graph.microsoft.com/.default");
          return token.token;
        }
      }
    });
  } catch (error) {
    console.warn("⚠️  Failed to initialize Azure credentials:", error.message);
  }
} else {
  console.info("ℹ️  Azure credentials not configured. Email service disabled. To enable, set AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET in .env");
}

const sendMail = async (to, subject, html) => {
  try {
    if (!client) {
      throw new Error("Azure Mail service is not configured. Please set AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET in .env file.");
    }

    await client.api(`/users/${process.env.AZURE_MAIL_SENDER}/sendMail`)
      .post({
        message: {
          subject: subject,
          body: {
            contentType: "HTML",
            content: html
          },
          toRecipients: [
            {
              emailAddress: {
                address: to
              }
            }
          ]
        }
      });

    console.log("Mail sent successfully");
    return true;

  } catch (error) {
    console.error("Mail error:", error);
    return false;
  }
};

module.exports = { sendMail };