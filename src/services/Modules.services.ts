import Modules from "@models/modules.model";

export default class ModulesServices {
  static async getAllModules() {
    return await Modules.findAll();
  }
  static async addModule(name: string, description: string) {
    return await Modules.create({ name: name, description: description });
  }
  static async getById(id: string) {
    return await Modules.findByPk(id);
  }
}
