const jwt = require("jsonwebtoken");

const BaseResponse = (response, dataResponse, unAuth = false) => {
  if (unAuth) {
    return response.status(401).json({
      data: null,
      statusCode: 401,
    });
  }
  if (dataResponse) {
    return response.status(200).json({
      data: dataResponse,
      statusCode: 0,
    });
  }
  return response.status(400).json({
    data: null,
    statusCode: 400,
  });
};

const wrapper = (originalFunction, options) => {
  return async (request, response, next) => {
    let token = {};
    const jwtToken = request?.headers?.authorization ?? "";
    const jwtBody = jwtToken.split(" ");
    if (!options?.ignoreAuth) {
      if (!jwtBody?.[1]) return BaseResponse(response, null, true);
      token = jwt.decode(jwtBody?.[1]);
    }
    try {
      const dataResponse = await originalFunction.call(this, {
        req: request,
        res: response,
        token: token,
        next: next,
      });
      return BaseResponse(response, dataResponse);
    } catch (error) {
      console.error(error);
    }
  };
};

module.exports = {
  BaseResponse,
  wrapper,
};
