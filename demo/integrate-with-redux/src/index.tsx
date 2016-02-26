import * as React from 'react';
import {render} from 'react-dom';
import {Model} from 'falcor';

import {connectModel, Store} from '../../../lib/built';

import * as Redux from 'redux';
import {connect, Provider} from 'react-redux';

const wrappedModel = Store.createFromModel(new Model({
    cache: {
        count: 0
    }
}));


/* Actions */
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

/* Reducers and store */
const reducer = (state: {}, action: {type: string; body?: any}) => {
    if(action.type === 'COUNTUP') {
        wrappedModel.set(action.body).subscribe();
    }
    return state;
}

const store = Redux.createStore(reducer);

/* Components */
class App extends React.Component<{count: number, dispatch: Redux.Dispatch}, {}> {
    render() {
        var {count, dispatch} = this.props;
        return (
            <div>
                <p>
                This is simple demonstation of Redux, React and Falcor.
                </p>
                <button onClick={() => dispatch(countUpAction(count + 1))}>Click + 1</button>
                <span>{count}</span>
            </div>
        );
    }
}

/* Redux and Falcor model Container */
const AppContainer = connect()(connectModel(App, wrappedModel, {
    count: 'count'
}));


/* Bootstrap */
render((<Provider store={store}><AppContainer /></Provider>), document.getElementById('app'));

