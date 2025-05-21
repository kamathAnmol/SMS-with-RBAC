import Sessions from "@models/sessions.model";
import User from "@models/users.model";
import generateToken from "@utilities/generateToken";
import crypto from "crypto";

class SessionServices {
  // get token data by token
  static async get(id: string) {
    return await Sessions.findByPk(id);
  }

  static async getSessionByUser(user: number) {
    return await Sessions.findOne({
      where: {
        user: user,
      },
    });
  }

  static async removeUserSession(user: number) {
    return await Sessions.destroy({
      where: {
        user: user,
      },
    });
  }

  static async createSession(user: number) {
    const accessToken = generateToken();
    const refreshToken = generateToken();
    await Sessions.create({
      user: user,
      access_token: accessToken.fingerprint,
      refresh_token: refreshToken.fingerprint,
    });
    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    };
  }

  static async updateAccessToken(session: Sessions) {
    const newAccessToken = generateToken();
    await session.update("access_token", newAccessToken.fingerprint);
    return newAccessToken.token;
  }

  static async deleteToken(session: Sessions) {
    return await session.destroy();
  }
}

export default SessionServices;
