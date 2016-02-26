import * as React from 'react';
import {render} from 'react-dom';
import {Model} from 'falcor';

import {connectModel, Store} from '../../../lib/built';

const store = Store.createFromModel(new Model({
    cache: {
        message: 'Hello, world'
    }
}));

class App extends React.Component<{message: string}, {}> {
    render() {
        return (
            <div>
                <h1>{this.props.message}</h1>
            </div>
        );
    }
}

const AppContainer = connectModel(App, store, {
    message: 'message'
});

render((<AppContainer />), document.getElementById('app'));

