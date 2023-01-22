import { SharedRepository } from "../Domain/shared.repository";
import { ProjectModel } from "../../project/Infrastructure/project.model";

// Documentation at SharedRepository: ../Domain/shared.repository
export class SharedDatabaseRepository implements SharedRepository {

    async ExistsProject(condition: { ID: string }): Promise<boolean> {
        const exists = await ProjectModel.exists(condition);
        if(!exists) return false;
        return true;
    }
}