
export interface SharedRepository {

    /**
     * Checks if one project exists.
     * @param condition ID of the project to look for.
     * @returns Indicates if the project was found.
     */
    ExistsProject(condition: { ID: string }): Promise<boolean>

}