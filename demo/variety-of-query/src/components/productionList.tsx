import * as React from 'react';
import {connectModel} from '../../../../lib/built';
import model from '../model';
import ProductionItemContainer from './productionItem';

interface Props {
    productions: {
        id: string;
        name: string;
    }[];
}

interface State {
    [key: string]: boolean;
}

class ProductionList extends React.Component<Props, State> {
    state = {} as State;
    constructor() {
        super();
    }

    toggle(id: string) {
        var state = this.state;
        state[id] = !this.state[id];
        this.setState(state);
    }

    render() {
        return (
            <div>
            {this.props.productions.map(p => {
                return (
                    <div key={p.id}>
                    <span>{p.name}</span>&nbsp;<a href="#" onClick={this.toggle.bind(this, p.id)}>toggle detail</a>
                    {this.state[p.id] && <ProductionItemContainer id={p.id}></ProductionItemContainer>}
                    </div>
                );
            })}
            </div>
        );
    }
}

export default connectModel(ProductionList, model, {
    productions: {
        query: 'productions[0..10]["id", "name"]',
        toArray: true
    }
});
