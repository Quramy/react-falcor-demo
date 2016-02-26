import {Store} from '../../../../lib/built'

const model = Store.createFromCache({
    productionsByIds: {
        P001: {
            id: 'P001',
            name: 'iPhone 6 Plus',
            vender: 'Apple',
            width: 414,
            height: 736,
            imageUrl: '/images/iphone_6.png'
        },
        P025: {
            id: 'P025',
            name: 'Google Nexus 5x',
            vender: 'LG',
            width: 360,
            height: 567,
            imageUrl: '/images/nexus_5x.png'
        },
        P004: {
            id: 'P004',
            name: 'BlackBerry Z30',
            vender: 'BlackBerry',
            width: 360,
            height: 640,
            imageUrl: '/images/blackberry_z30.png'
        }
    },
    productions: [
        {$type: 'ref', value: ['productionsByIds', 'P001']},
        {$type: 'ref', value: ['productionsByIds', 'P025']},
        {$type: 'ref', value: ['productionsByIds', 'P004']},
    ]
});

export default model;
