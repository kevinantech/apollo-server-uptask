import { SharedRepository } from "../Domain/shared.repository";

export enum AVAILABLE_MODELS {
    Project = 'Project'
}

export class UCShared {
    constructor(private readonly sharedRepository: SharedRepository){}

    async Exists(condition: { ID: string }, selectedModel: { Project?: true }): Promise<boolean> {
        
        var Exist: boolean = false;
        const selectedModelKeys = Object.keys(selectedModel);

        // Checks that there is only one model selected.
        if(selectedModelKeys.length != 1) throw new Error('You must set only one option');

        // Saves the selected option
        const selectedModelKey = selectedModelKeys.pop();

        // Core
        if(selectedModelKey === AVAILABLE_MODELS.Project){
            Exist = await this.sharedRepository.ExistsProject(condition);
        }
        
        if(!Exist) throw new Error(`The ${selectedModelKey} does not exist`);
        return Exist;
    }
}