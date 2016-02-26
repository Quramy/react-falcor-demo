
declare namespace __Falcor {

    interface ModelParams {
        onChange?: Function;
        [key: string]: any;
    }

    class Model {
        constructor(options?: ModelParams);
        asDataSource(): any;
        get(...paths: any[]): any;
        set(...paths: any[]): any;
        call(...args: any[]): any;
    }
}

declare namespace __FalcorHttpDataSource {
    class HttpDataSource {
        constructor(url: string);
    }
}

declare module "falcor" {
    export = __Falcor;
}

declare module "falcor/browser" {
    import Model = __Falcor.Model;
    import HttpDataSource = __FalcorHttpDataSource.HttpDataSource;
    export {
        Model,
        HttpDataSource
    }
}
