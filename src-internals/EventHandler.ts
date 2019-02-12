import Utils from "./Utils";

export default class EventHandler<T extends string = string>
{

    private m_Registry: {[name: string]: EventHandlerFn[]}; 

    public constructor()
    {
        this.m_Registry = {};
    }

    public bind(event: T, fn: EventHandlerFn)
    {
        const list = this.m_Registry[event];

        if(Utils.isDefined(list))
        {
            list.push(fn);
        }
        else
        {
            this.m_Registry[event] = [ fn ];
        }
    }

    public unbind(event: T)
    {
        if(Utils.isDefined(this.m_Registry[event]))
        {
            delete this.m_Registry[event];
        }
    }

    public fire(event: T)
    {
        if(!Utils.isDefined(this.m_Registry[event]))
        {
            return;
        }

        for (const fn of this.m_Registry[event]) 
        {
            fn();    
        }
    }

}

type EventHandlerFn = () => void;