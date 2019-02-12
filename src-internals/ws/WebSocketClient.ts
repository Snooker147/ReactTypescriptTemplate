import Utils from "@internals/Utils";
import EventHandler from "@internals/EventHandler";
import { WebSocketMessage } from "./WebSocketMessage";

enum WebSocketClientEvent
{
    Open = "open",
    Close = "close",
    Error = "error"
}

/**
 * Beta implemention of WebSocketClient where T are the message names
 */
export default class WebSocketClient<T extends string = string>
{

    private m_Socket: WebSocket;
    private m_Ready: boolean;
    private m_Events: EventHandler<WebSocketClientEvent>;
    private m_Messages: { [message: string]: any[] };

    public constructor() 
    {
        this.m_Socket = null;
        this.m_Ready = false;
        this.m_Events = new EventHandler();
        this.m_Messages = {};
    }

    public async connect(): Promise<boolean>
    {
        return new Promise(res => {
            // @ts-ignore
            window.WebSocket = window.WebSocket | window.MozWebSocket;
            
            this.m_Socket = new WebSocket(`ws://${Utils.getBackendAddress()}`);
            
            this.m_Socket.onopen = () => {
                this.m_Ready = true;
                res(true);

                this.m_Events.fire(WebSocketClientEvent.Open);
            };
            
            this.m_Socket.onclose = () => {
                this.m_Ready = false;

                this.m_Events.fire(WebSocketClientEvent.Close);
            };

            this.m_Socket.onerror = () => {
                this.m_Events.fire(WebSocketClientEvent.Error);
            };

            this.m_Socket.onmessage = em => {
                const data = em.data;

                if(!Utils.isString(data))
                {
                    Utils.err(`Message received by WebSocket server is not a string!`);
                    return;
                }

                try
                {
                    const json = JSON.parse(data) as WebSocketClientFn<any>;
                    
                    if(!Utils.isObject(json))
                    {
                        Utils.err(`Message received by WebSocket server is not a valid JSON!`);
                        return;
                    }

                    this.fire(json);
                }
                catch(e)
                {
                    Utils.err(`Message received by WebSocket server (${data}) is not a valid JSON!`);
                }

                Utils.log(em.data);
            };
        });
    }

    private fire(message: WebSocketMessage)
    {
        const handlers = this.m_Messages[message.name];

        if(!Utils.isArray(handlers))
        {
            return;
        }

        for (const handler of handlers) 
        {
            (handler as WebSocketClientFn<any>)(message);    
        }
    }

    public bind<K extends WebSocketMessage>(name: T, fn: WebSocketClientFn<K>)
    {
        const handlers = this.m_Messages[name];

        if(!Utils.isArray(handlers))
        {
            this.m_Messages[name] = [ fn ];
        }
        else
        {
            handlers.push(fn);
        }
    }

    public get eventHandler() { return this.m_Events; }
    public get connected() { return this.m_Socket !== null; }
    public get ready() { return this.m_Ready; }

}

type WebSocketClientFn<T extends WebSocketMessage> = (msg: T) => void;