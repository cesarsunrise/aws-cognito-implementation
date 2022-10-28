const AWS = require("aws-sdk");
const crypto = require("crypto");
const {
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
  COGNITO_REGION,
  API_VERSION,
  COGNITO_POOL_ID,
} = require("../config");

class Cognito {
  config = {
    apiVersion: API_VERSION,
    region: COGNITO_REGION,
  };

  clientId = COGNITO_CLIENT_ID;
  clientSecret = COGNITO_CLIENT_SECRET;
  poolId = COGNITO_POOL_ID;

  cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  async signUpUser(username, password, userAttr) {
    var params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
      UserAttributes: userAttr,
    };

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return true;
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }

  async signInUser(username, password) {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(username),
      },
    };

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      return data.AuthenticationResult.AccessToken;
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }

  async confirmSignUp(username, code) {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    try {
      const cognitoResp = await this.cognitoIdentity
        .confirmSignUp(params)
        .promise();
      console.log(cognitoResp);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  async forgotPassword(username) {
    const params = {
      ClientId: this.clientId /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async confirmNewPassword(username, password, code) {
    const params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword(params)
        .promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getUser(accessToken) {
    const params = {
      AccessToken: accessToken,
    };

    try {
      const data = await this.cognitoIdentity.getUser(params).promise();
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async listUsers(findBy, keyword) {
    const params = {
      AttributesToGet: ["sub", "name", "family_name", "email", "phone_number"],
      Filter: `${findBy} = "${keyword}"`,
      Limit: 1,
      UserPoolId: this.poolId,
    };

    try {
      const data = await this.cognitoIdentity.listUsers(params).promise();
      return data;
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }

  hashSecret(username) {
    return crypto
      .createHmac("SHA256", this.clientSecret)
      .update(username + this.clientId)
      .digest("base64");
  }
}

module.exports = Cognito;
