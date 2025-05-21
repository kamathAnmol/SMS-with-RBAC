import Config from "@models/config.model";

class ConfigServices {
  static async getAccessTokenExpiryDuration() {
    return await Config.findOne({
      where: {
        name: "ACCESS_TOKEN_EXPIRY_DURATION",
      },
    });
  }
  static async getRefreshTokenExpiryDuration() {
    return await Config.findOne({
      where: {
        name: "REFRESH_TOKEN_EXPIRY_DURATION",
      },
    });
  }
}

export default ConfigServices;
