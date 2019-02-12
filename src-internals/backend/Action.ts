import { Types } from "../Types";
import Utils from "@internals/Utils";
import { ActionResponse, ActionResponseError } from "./ActionResponse";

/**
 * Promise action designed to contact backend server and return data or push state
 */
export default class Action<T extends ActionResponse = ActionResponse>
{
    private m_Function: ActionFunction;
    private m_Method: Types.HTTPMethod;

    private m_Error: ActionResponseError;
    private m_Response: T;
    
    private m_Finished: boolean;
    
    private constructor(fn: string, method: Types.HTTPMethod) 
    {
        this.m_Function = fn;
        this.m_Method = method;
        this.m_Response = null;
        this.m_Error = null;
        this.m_Finished = false;
    }

    /**
     * Creates a new GET Action request and immedietly execute it (provided you use await otherwise its a simple promise)
     * @param fn API Function to use 
     * @param args In order Arguments
     */
    public static async get(fn: ActionFunction, ...args: ArrayArgs): Promise<Action>
    {
        const argumentString: string[] = [];

        for(const arg of args)
        {
            if(!Utils.isDefined(arg))
            {
                Utils.err(`Action::get for function ${fn} has an undefined or null argument! That is not allowed`);
                return null;
            }

            argumentString.push(arg.toString());
        }

        const a = new Action(fn, Types.HTTPMethod.GET);

        await a.createRequest(`${window.location.origin}${Utils.getBackendPrefix()}/${fn}/${argumentString.join("/")}`);
        
        return a;
    }

    /**
     * Creates a new POST Action request and immedietly execute it (provided you use await otherwise its a simple promise)
     * @param fn API Function to use 
     * @param args Body arguments to pass with request
     */
    public static async post(fn: ActionFunction, args: ObjectArgs): Promise<Action>
    {
        const a = new Action(fn, Types.HTTPMethod.POST);
        
        const data = new FormData();
        for(const key in args)
        {
            data.append(key, args[key].toString());
        }
        
        await a.createRequest(`${window.location.origin}${Utils.getBackendPrefix()}/${fn}`, data);

        return a;
    }

    // Creates XMLHttpRequest to the desired URL and returns whether it was successful or not
    private async createRequest(url: string, postArguments: FormData = null): Promise<boolean>
    {
        return new Promise(res => {
            const http = new XMLHttpRequest();
            
            http.onreadystatechange = () => {
                if(http.readyState !== 4)
                {
                    return;
                }

                // Request finished
                this.m_Finished = true;

                if(http.status !== 200)
                {
                    Utils.err(`Action::get for function ${this.function} responsed with invalid status of: ${http.status} (${http.statusText})`);

                    this.m_Error = ActionResponseError.ResponseInvalidStatus;
                    res(false);
                    
                    return;
                }

                try
                {
                    this.m_Response = JSON.parse(http.responseText);

                    if(!Utils.isDefined(this.m_Response) || !Utils.isObject(this.m_Response))
                    {
                        throw Error("Response is not JSON object!");
                    }
                }
                catch(e)
                {
                    Utils.err(`Failed to parse Action response into JSON: ${JSON.stringify(e)}`);
                    
                    this.m_Error = ActionResponseError.ReponseNonParsable;
                    res(false);

                    return;
                }
                
                if(Utils.isDefined(this.m_Response.error))
                {
                    // This is not an internal error with HTTP request
                    // but an error that the server reported itself
                    // it therefor is technically not an ActionResponseError but we'll still treat it like one as the developer
                    // should always return either a string that describes it well enough or an already defined error code using
                    // self defined ActionResponseError struct (see ActionResponse.ts)
                    this.m_Error = this.m_Response.error as any;
                }
                
                res(true);
            };
            
            http.open(this.method, url, true);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(postArguments);
        });
    }

    /** Reponse got from the URL */
    public get response() { return this.m_Response; }

    /** Returns error that happened with this Action (or null if no error happened) */
    public get error() { return this.m_Error; }

    /** The function name (example: get-online-users) */
    public get function() { return this.m_Function; }

    /** Returns method this action uses */
    public get method() { return this.m_Method; }

    /** Whether this Action has already been fired and executed */
    public get finished() { return this.m_Finished; }
}

type ActionArg = string | number | boolean;
type ObjectArgs = {[name: string]: ActionArg};
type ArrayArgs = ActionArg[];

/** The function name for backend server */
type ActionFunction = string;

// For your production we recommend creating your own ActionFunction type with all possible string attached to it
// So you can use Intellisense to simplify action calling
// See example below
export enum MyActionFunction
{
    GetOnlineUsers = "get-online-users",
    SetTitleText = "set-title-set"
} 