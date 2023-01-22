import { SharedRepository } from "../Domain/shared.repository";
import { ProjectModel } from "../../project/Infrastructure/project.model";

enum AVAILABLE_MODELS {
    Project = 'Project'
}

// Documentation at SharedRepository: ../Domain/shared.repository
export class SharedDatabaseRepository implements SharedRepository {

    async Exists(condition: {ID: string;}, selectedModel:{Project?:true} ): Promise<boolean> {

        const selectedModelKeys = Object.keys(selectedModel); ; 

        // VALIDATIONS

        // Checks that there is only one model selected.
        if(selectedModelKeys.length != 1) throw new Error('You must set only one option');

        // Saves the selected option
        const selectedModelKey = selectedModelKeys.pop();

        // CORE
        if(selectedModelKey === AVAILABLE_MODELS.Project){
            const exists = await ProjectModel.exists(condition);
            if(!exists) return false;
        }

        
        return true;
    }
}