const userAttributes = (body) => {
  const { email, phone_number, first_name, last_name } = body;
  let userAttr = [];
  userAttr.push({ Name: "email", Value: email });
  userAttr.push({ Name: "phone_number", Value: phone_number });
  userAttr.push({ Name: "name", Value: first_name });
  userAttr.push({ Name: "family_name", Value: last_name });
  return userAttr;
};

const userResponseAttributes = (body) => {
  const response = {
    token: body.Username,
    id: body.Username,
    user: {},
  };
  body.UserAttributes.forEach((attribute) => {
    response.user[attribute.Name] = attribute.Value;
  });

  response.token = response.user.sub;
  return response;
};

const userErrorResponse = (message) => {
  const errorData = {
    token: null,
    id: null,
    user: null,
    error: message,
  };

  return errorData;
};

module.exports = {
  userAttributes,
  userResponseAttributes,
  userErrorResponse,
};
