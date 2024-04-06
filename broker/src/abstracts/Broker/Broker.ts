import { BrokerApi } from "./BrokerApi";

export abstract class Broker {
    
    public api: BrokerApi;

    constructor() {
        this.api = this.getApi();   
    }

    public abstract writeState(): void;
    protected abstract getApi(): BrokerApi;

    public call(apiMethod: keyof typeof this.api): any {
        
        if (!this.api.hasOwnProperty(apiMethod)) throw new Error(`Method '${apiMethod}' not exists`);

        return this.api[apiMethod];
    }

}