import Modules from "@models/modules.model";

export default class ModulesServices {
  static async getAllModules() {
    return await Modules.findAll();
  }
}
