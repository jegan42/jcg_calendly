const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const client_id = process.env.GOOGLE_CLIENT_ID ?? 'your-client-id';
const client_secret = process.env.GOOGLE_CLIENT_SECRET ?? 'your-client-secret';
const redirect_uri = process.env.GOOGLE_REDIRECT_URI ?? 'your-redirect-uri';

const oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirect_uri
);

// Générer l'URL d'autorisation
export const getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
};

// Échanger le code d'autorisation contre un access token
export const getAccessToken = async (code: string) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

export const getOAuth2Client = () => {
    return oauth2Client;
};