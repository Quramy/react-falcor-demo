import {EventEmitter} from 'events';
import * as Falcor from 'falcor';

export default class Store extends Falcor.Model {
    private emitter: EventEmitter;
    constructor(option: Falcor.ModelOptions) {
        var opt: Falcor.ModelOptions = option;
        var originalCallback = option.onChange || (() => {});
        opt.onChange = () => {
            this.emitter && this.emitter.emit('change');
        };
        super(opt);
        this.emitter = new EventEmitter();
    }

    static createFromModel(rawModel: Falcor.Model) {
        return new Store({
            source: rawModel.asDataSource()
        });
    }

    static createFromCache(cache: any) {
        return new Store({
            cache
        });
    }

    addChangeListener(query: string, onSuccess: (json?: Falcor.JSONEnvelope<any>) => any);
    addChangeListener<T>(query: string, onSuccess: (json?: Falcor.JSONEnvelope<T>) => any) {
        var handler = () => {
            this.get<T>(query).then(res => {
                if(res) {
                    onSuccess(res);
                }
            });
        };
        this.emitter.on('change', handler);
        var off = () => {
            this.emitter.removeListener('change', handler);
        };
        return off;
    }
}
