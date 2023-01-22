
export interface SharedRepository {

    /**
     * Look for a document in your respective model
     * 
     * @param condition ID of the document to search.
     * @param selectedModel Define business model to look for.
     * @returns {Promise<boolean>} Indicates if the document was found.
     * 
     * Note: You can add more models selected, only define the businness models that wish you.
     * MODELS AVAIABLES: Project.
     */
    Exists({ ID }:{ID:string}, options:{Project?:true}): Promise<boolean>

    
}