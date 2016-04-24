import Store from './store';
import * as Falcor from 'falcor';
import * as assert from 'assert';

const cache = {
    greeting: 'Hello',
    hoge: {foo: {bar: 'piyo'}}
};

describe('Store', function() {

    describe('Change observation', function() {
        it('emits an event when model value change', function(done) {
            const store = new Store({
                cache
            });
            store.addChangeListener('greeting', (res) => {
                assert.equal(res.json.greeting, 'HELLO');
                done();
            });
            store.setValue('greeting', 'HELLO').subscribe();
        });
    });
    describe('static build methods', function() {
        it('creates new store from falcor model', function(done) {
            const model = new Falcor.Model({
                cache
            });
            const store = Store.createFromModel(model);
            store.getValue('greeting').subscribe(val => {
                assert.equal(val, 'Hello');
                done();
            });
        });

        it('creates new store from cache object', function(done) {
            const store = Store.createFromCache(cache);
            store.getValue('greeting').subscribe(val => {
                assert.equal(val, 'Hello');
                done();
            });
        });
    });
});
