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
  static async getTokenByUserRole(userRole: number) {
    return await Tokens.findOne({
      where: {
        userRole: userRole,
      },
    });
  }

  static async deleteToken(token: Tokens) {
    return await token.destroy();
  }
}

export default TokenServices;
