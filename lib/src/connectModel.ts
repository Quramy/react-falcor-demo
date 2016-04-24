import * as React from 'react';
import * as Falcor from 'falcor';
import Store from './store';
import {toArray} from './util';

export interface QueryHolder {
    query: string;
    toArray?: boolean;
    handler?: (res: any) => any;
}

export interface ModelToProps<T> {
    [propName: string]: (string | QueryHolder | ((externalProps: T) => QueryHolder));
}

function parse(modelToProps?: ModelToProps<any>) {
    return Object.keys(modelToProps).map(stateKey => {
        const queryObj = modelToProps[stateKey];
        let query: string, fn: Function;
        if(typeof queryObj === 'string') {
            fn = (props: any) => {
                return {
                    query: queryObj,
                    toArray: false,
                }
            };
        }else if(typeof queryObj === 'object') {
            const obj = queryObj as QueryHolder;
            fn = (props: any) => {
                return {
                    query: obj.query,
                    toArray: obj.toArray,
                    handler: obj.handler
                };
            };
        }else if(typeof queryObj === 'function') {
            fn = queryObj as ((props: any) => QueryHolder);
        }
        return {
            stateKey,
            queryFn: fn as any
        };
    });
}

export interface ContainerState {
    $loading: boolean;
    [key: string]: any;
}

export class ModelContainer extends React.Component<{[propKey: string]: any}, ContainerState> {

    state = { $loading: true };

    private queries: {stateKey: string; queryFn: (props: any) => QueryHolder}[];
    private unregisters: (() => void)[] = [];

    constructor(
        private model: Store,
        modelToProps: ModelToProps<any>,
        private delegate: (typeof React.Component)
    ){
        super();
        this.queries = parse(modelToProps);
    }

    graphToState(query: {stateKey: string; queryFn: (props: any) => QueryHolder}) {
        const stateKey = query.stateKey;
        const queryHolder = query.queryFn(this.props);

        const handler = (res: Falcor.JSONEnvelope<any>) => {
            const json = res.json;
            const newState: ContainerState = {$loading: false};
            let value: any;
            if(!json) return;
            if(typeof queryHolder.handler === 'function') {
                value = queryHolder.handler(res);
            }else{
                value = queryHolder.toArray ? toArray(json[stateKey]): json[stateKey];
            }
            newState[stateKey] = value;
            return newState;
        };
        return handler;
    }

    componentDidMount() {
        this.queries.forEach(q => {
            const graphToState = this.graphToState(q);
            const handler = (res: Falcor.JSONEnvelope<any>) => this.setState(graphToState(res));
            const query = q.queryFn(this.props).query;

            this.unregisters.push(this.model.addChangeListener(query, handler));

            this.model.get(query).then((res) => handler(res));
        });
    }

    componentWillUnmount() {
        this.unregisters.forEach($unreg => $unreg());
    }

    render() {
        const props = {};
        if(this.props) {
            Object.keys(this.props).forEach(key => {
                props[key] = this.props[key];
            });
        }
        this.queries.forEach(q => {
            props[q.stateKey] = this.state[q.stateKey];
        });
        if(this.state.$loading) {
            return null;
        }else{
            return React.createElement(this.delegate, props);
        }
    }
}

export class ContainerBase extends React.Component<any, any>{}

export default function connectModel<T>(delegate: typeof React.Component, model: Store, modelToProps: ModelToProps<T>) {
    return class extends ModelContainer {
        constructor() {
            super(model, modelToProps, delegate);
        }
    } as (typeof ContainerBase);
}
