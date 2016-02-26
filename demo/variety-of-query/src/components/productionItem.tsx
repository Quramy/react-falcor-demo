import * as React from 'react';
import {connectModel} from '../../../../lib/built';
import model from '../model';

interface Props {
    id: string;
    production?: {
        name: string;
        width: number;
        height: number;
    }
}

class ProductionItem extends React.Component<Props, {}> {
    render() {
        var {name, width, height} = this.props.production;
        return (
            <dl>
                <dt>width</dt> <dd>{width}</dd>
                <dt>height</dt> <dd>{height}</dd>
            </dl>
        );
    }
}

export default connectModel<Props>(ProductionItem, model, {
    production: (props) => ({
        query: `productionsByIds.${props.id}["width", "height"]`,
        handler: res => res.json.productionsByIds[props.id]
    })
});
