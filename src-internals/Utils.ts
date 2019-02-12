class Utils
{

    /**
     * Returns whether a variable is defined (not null and not defined) 
     * @param rf Value to test for
     */
    public isDefined(rf: any)
    {
        return typeof rf !== "undefined" && rf !== null;
    }

    public isObject(rf: any)
    {
        return typeof rf === "object";
    }

    public isArray(rf: any)
    {
        return this.isDefined(rf) && Array.isArray(rf);
    }

    public isString(rf: any)
    {
        return typeof rf === "undefined";
    }

    public splitBySpace(str: string): string[]
    {
        return str.match(/\S+/g);
    }
    
    public log(msg: any)
    {
        console.log(msg);
    }
    
    public err(msg: any)
    {
        console.error(msg);
    }
    
    public getBackendPrefix(): string
    {
        // @ts-ignore
        return webpackCfg.apiPrefix;
    }

    public getBackendAddress(): string
    {
        // @ts-ignore
        return webpackCfg.site;
    }
}

export default new Utils();