import { ProjectModel } from "../../models/project.model";
import type { ProjectInputDto } from "../../dto/project.dto";

export class ProjectResolver { 
  
  constructor(){}
  
  static async create(_: any, { input }: { input: ProjectInputDto }, context: any) {
    try {
      const newProject = new ProjectModel(input);
      newProject.author = context.auth.id;
      const result = await newProject.save();
      return result;
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}