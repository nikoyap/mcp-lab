import { Router } from "express";
import crypto from "crypto";
import axios from "axios";

const router = Router();

const CLIENT_ID =
  "mcp-client-iOkGJb4qxSJYehM0";

const AUTHORIZATION_ENDPOINT =
  "https://mcp.clickup.com/oauth/authorize";

const TOKEN_ENDPOINT =
  "https://mcp.clickup.com/oauth/token";

const REDIRECT_URI =
  "https://clickup-mcp.artificialph.com/api/oauth/callback";

const SCOPES = [
  "read",
  "write",
];

let oauthState = "";
let codeVerifier = "";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let expiresAt: number | null = null;


// Generate PKCE verifier
function generateCodeVerifier() {
  return crypto
    .randomBytes(32)
    .toString("base64url");
}


// Generate PKCE challenge
function generateCodeChallenge(
  verifier: string
) {
  return crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
}


// Start OAuth login
router.get("/login", (_req, res) => {

  codeVerifier =
    generateCodeVerifier();

  const codeChallenge =
    generateCodeChallenge(
      codeVerifier
    );


  oauthState =
    crypto.randomBytes(16)
      .toString("hex");


  const params =
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state: oauthState,
      scope: SCOPES.join(" "),
      resource:
        "https://mcp.clickup.com/mcp",
    });


  const url =
    `${AUTHORIZATION_ENDPOINT}?${params.toString()}`;


  console.log(
    "OAuth redirect:",
    url
  );


  res.redirect(url);

});


// OAuth callback
router.get(
  "/callback",
  async (req, res) => {

    const {
      code,
      state,
      error,
    } = req.query;


    if (error) {
      return res.status(400).send({
        error,
      });
    }


    if (
      state !== oauthState
    ) {
      return res.status(400).send({
        error:
          "Invalid OAuth state",
      });
    }


    try {

      const response =
        await axios.post(
          TOKEN_ENDPOINT,
          {
            grant_type:
              "authorization_code",

            client_id:
              CLIENT_ID,

            code,

            redirect_uri:
              REDIRECT_URI,

            code_verifier:
              codeVerifier,
          },
          {
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );


      accessToken =
        response.data.access_token;

      refreshToken =
        response.data.refresh_token ??
        null;


      expiresAt =
        response.data.expires_in
          ? Date.now() +
            response.data.expires_in *
            1000
          : null;


      console.log(
        "OAuth success"
      );


      res.redirect("/");

    } catch (err:any) {

      console.error(
        "OAuth exchange failed",
        err.response?.data ||
        err.message
      );


      res.status(500).json({
        error:
          "Token exchange failed",

        details:
          err.response?.data,
      });

    }

  }
);


// OAuth status
router.get(
  "/status",
  (_req,res)=>{

    res.json({
      authenticated:
        !!accessToken,

      expiresAt,

    });

  }
);


// Export token getter
export function getAccessToken() {
  return accessToken;
}


export default router;
