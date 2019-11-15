export interface SearchValue {
    [propName: string]: any; // eslint-disable-line
}

export interface ContentProps {
    searchWords: string;
    item: SearchValue;
    highlight: (searchWords: string, str: string) => string;
}
