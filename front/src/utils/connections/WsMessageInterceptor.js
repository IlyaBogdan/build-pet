export const WsMessageInterceptor = (() => {

    let instance;

    return class WsMessageInterceptor {

        constructor() {
            if (instance) return instance;
            this._api = this.api();           
    
            instance = this;
        }
    
        // abstract
        api(self) { return self; }
        
    }
})();