class Utils
{

    public splitBySpace(str: string): string[]
    {
        return str.match(/\S+/g);
    }


}

export default new Utils();