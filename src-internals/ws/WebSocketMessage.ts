export enum WebSocketMessageError
{
    // Define your own Websocket error messages
    Internal = "Internal"
}

export interface WebSocketMessage
{
    name: string;
    error?: WebSocketMessageError;
}