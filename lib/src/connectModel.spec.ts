import Store from './store';
import connectModel from './connectModel';
import {ModelContainer} from './connectModel';
import * as React from 'react';
import * as assert from 'assert';

class TestComponent extends React.Component<{message: string}, any> {
    render() {
        return React.createElement('div', this.props.message);
    }
}

function createStore() {
    return new Store({
        cache: {
            greeting: 'Hello'
        }
    });
}

describe('connectModel', function() {

    describe('container class', function() {
        it('returns React Component class', function() {
            const containerElm = React.createElement(connectModel(TestComponent, createStore(), {
                greeting: 'greeting'
            }));
            assert(!!containerElm);
        });
    });

    describe('graphToState', function() {
        it('returns new state from Falcor query', function(done) {
            const container = new ModelContainer(null, {}, null);
            const newState = container.graphToState({
                stateKey: 'greeting',
                queryFn: () => ({query: 'greeting', handler: (res) => res.json.greeting})
            })({
                json: {
                    greeting: 'Hello'
                }
            });
            assert(newState['greeting'] === 'Hello');
            done();
        });
    });
});
