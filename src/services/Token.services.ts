import Tokens from "@models/tokens.model";
import generateToken from "@utilities/generateToken";

class TokenServices {
  // get token data by token
  static async getTokenData(token: string) {
    return await Tokens.findByPk(token);
  }

  static async createToken(userRole: number) {
    const newToken = generateToken();
    const createdTime = new Date();
    const expireTime = new Date(Date.now() + 1000 * 60 * 60);
    return await Tokens.create({
      token: newToken,
      userRole: userRole,
      createdAt: createdTime,
      expiresOn: expireTime,
    });
  }
}

export default TokenServices;
