import { ProjectModel } from "./src/models/project.model";
import type { ProjectInputDto } from "./src/dto/project.dto";

export class ProjectResolver { 
  
  constructor(){}

  static async getAll (_: any, {}: any, context: any ){
    const projects = await ProjectModel.find({ author: context.auth?.id});
    return projects;
  }
  
  static async create (_: any, { input }: { input: ProjectInputDto }, context: any) {
    if(!context.auth?.id) throw new Error('No permissions');
    try {
      const newProject = new ProjectModel(input);
      newProject.author = context.auth.id;
      const result = await newProject.save();
      return result;
    } catch (e) {
      console.log(e);
    }
    return 'Something is wrong';
  }

  static async update (_: any, { id, input }: { id: string, input: ProjectInputDto }, context: any) {
    // Verifica si el proyecto existe.
    const project = await ProjectModel.findById(id);
    if(!project) throw new Error('The project does not exist');
    // Verifica si el que trata de modificar el proyecto es el creador
    if( project.author.toString() !== context.auth?.id ) throw new Error('No permissions');

    const updatedProject = await ProjectModel.findOneAndUpdate({ _id: id }, input, { new:true });
    return updatedProject;
  }

  static async delete (_:any, {id}:{id:string}, context:any) {
    // Verifica si el proyecto existe.
    const project = await ProjectModel.findById(id);
    if(!project) throw new Error('The project does not exist');
    // Verifica si el que trata de modificar el proyecto es el creador
    if( project.author.toString() !== context.auth?.id ) throw new Error('No permissions');

    try{
      await ProjectModel.deleteOne({ _id: id });
      return "Success delete";
    } catch(e) { console.log(e) }
    return undefined;
  }
}