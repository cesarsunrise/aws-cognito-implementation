require("dotenv").config();
const response = require("./src/utils/httpResponse");
const signupValidator = require("./src/utils/signupValidator");
const {
  userAttributes,
  userResponseAttributes,
  userErrorResponse,
} = require("./src/utils/userTransform");
const Cognito = require("./src/libs/CognitoService");

const handler = async (event) => {
  try {
    const postbody = JSON.parse(event.body);
    signupValidator(postbody);

    const userAttr = userAttributes(postbody);
    const cognitoService = new Cognito();

    const { email, password } = postbody;

    // Get the first part of the mail to use as username
    const username = email.split("@")[0];
    await cognitoService.signUpUser(username, password, userAttr);

    // To obtain the user data, it is necessary to log in and obtain the accessToken
    const signInResponse = await cognitoService.signInUser(email, password);
    const userResponse = await cognitoService.getUser(signInResponse);
    return response.OK(userResponseAttributes(userResponse));
  } catch (error) {
    console.log(response.OK(userErrorResponse(error.message)));
    return response.OK(userErrorResponse(error.message));
  }
};

// LAMBDA BODY MOCKDATA
// const event = {
//   body: JSON.stringify({
//     first_name: "Test",
//     last_name: "Test",
//     phone: "1455658741",
//     email: "test2@sunrise.com",
//     password: "1234Sun@2022"
//   }),
// };

// handler(event);

module.exports = { handler };
