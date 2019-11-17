import React from 'react';
import classes from 'classnames';
import { SearchBar } from '@com';
import { SearchValue, ContentProps, SearchBarContainerBarProps } from './interface';
import transformSearchValue from './transformSearchValue';
import './index.less';

const SearchBarContainer: React.FC<SearchBarContainerBarProps> = props => {
    const { state } = props;
    const {
        searchBar: { visible },
        data: { nodes },
        graphRef,
        toolbar: { direction },
    } = state;
    const apis = graphRef.current.getApis();

    const onSearch = (value: string) => {
        return new Promise<SearchValue[]>(resolve => {
            const result = apis.search(value);
            // 数据中必须包含name属性
            const transformValue = transformSearchValue(result);
            resolve(transformValue);
        });
    };

    const onSearchHistory = () => {
        // TODO:获取当前画布的搜索历史记录
        const result: SearchValue[] = [];
        return new Promise<SearchValue[]>(resolve => resolve(result));
    };

    const onSelect = (e: SearchValue) => {
        const { id } = e;
        nodes.forEach((item: SearchValue) => {
            if (item.id === id) {
                apis.highlight([id]);
            }
        });
        // TODO:历史记录存储到localStorage中
    };

    const renderContent = (options: ContentProps) => {
        const { item, highlight, searchWords } = options;
        const text = highlight(searchWords, item.name);
        return `<span>${text}</span>`;
    };

    const clearHistory = () => {
        // TODO:清空当前画布的搜索历史记录
    };

    const rootClass = classes('searchBar-container', direction === 'horizontal' ? 'search-below-toolbar' : '');

    return (
        <div className={rootClass}>
            <SearchBar
                visible={visible}
                isFocus
                allowClear
                placeholder="请输入搜索的节点id或label"
                onSearch={onSearch}
                onSearchHistory={onSearchHistory}
                onSelect={onSelect}
                renderContent={renderContent}
                clearHistory={clearHistory}
            />
        </div>
    );
};

export default SearchBarContainer;
