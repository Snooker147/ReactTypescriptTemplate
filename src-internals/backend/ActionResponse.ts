// Enum of errors that can happen
export enum ActionResponseError 
{
    // Here define all your custom errors that can happen in your application
    Internal = "Internal",
    
    // Fired when the response is not a valid parsable JSON string
    ReponseNonParsable = "ReponseNonParsable",

    // Fired when the response returned status that is not 200 
    ResponseInvalidStatus = "ResponseInvalidStatus"
}

export interface ActionResponse<T = any>
{
    error?: ActionResponseError;
    response?: T;
}
