import { SearchValue } from './interface';

const getMatchWords = (item: SearchValue) => {
    const {
        data: { id, label },
        searchTypes,
    } = item;
    return searchTypes.reduce((acc: string, curr: string) => {
        let currentText = '';
        switch (curr) {
            case 'id':
                currentText = String(id);
                break;
            case 'label':
                currentText = String(label);
                break;
            default:
                break;
        }
        return `${acc}  ${currentText}`;
    }, '');
};

const transformSearchValue = (data: SearchValue[]) => {
    const filterData = data.filter(item => {
        const { searchTypes } = item;
        return searchTypes.indexOf('property') === -1;
    });
    return filterData.map(item => {
        const matchWords = getMatchWords(item);
        Object.assign(item, { name: matchWords });
        return item;
    });
};

export default transformSearchValue;
