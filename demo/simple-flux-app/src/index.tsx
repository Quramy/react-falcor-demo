import * as React from 'react';
import {render} from 'react-dom';
import {Dispatcher} from 'flux';
import {Model} from 'falcor';

import {connectModel, Store} from '../../../lib/built';

/*** Common ***/
interface Action<T> {
    type: string;
    body: T;
}

/*** Dispatcher ***/
const dispatcher = new Dispatcher<Action<any>>();


/*** Store ***/
const store = Store.createFromModel(new Model({
    cache: {
        count: 0
    }
}));

// Liseten to action and set value to model
const id = dispatcher.register((action) => {
    switch(action.type) {
        case 'COUNTUP':
            store.set(action.body).subscribe();
    }
});


/*** ActionCreator ***/
const countUpAction = (value: number) => {
    return {
        type: 'COUNTUP',
        // It's compatible for parameters Falcor.model#set.
        body: {
            path: 'count',
            value
        }
    };
};


/*** Containers ***/

// Component
class App extends React.Component<{count: number, dispatch: (action: Action<any>) => void}, {}> {
    countUp() {
        this.props.dispatch(countUpAction(this.props.count + 1));
    }
    render() {
        var {count} = this.props;
        return (
            <div>
                <p>
                This is simple demonstation of Falcor, React and flux.
                </p>
                <button onClick={this.countUp.bind(this)}>Click + 1</button>
                <span>{count}</span>
            </div>
        );
    }
}

// App Container
const AppContainer = connectModel(App, store, {
    count: 'count'
});


/*** Bootstrap ***/
render(<AppContainer dispatch={dispatcher.dispatch.bind(dispatcher)}/>, document.getElementById('app'));

