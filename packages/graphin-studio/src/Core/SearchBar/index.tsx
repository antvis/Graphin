import React from 'react';
import { SearchBar } from '@com';
import { SearchValue, ContentProps, SearchBarContainerBarProps } from './interface';
import transformSearchValue from './transformSearchValue';
import './index.less';

const SearchBarContainer: React.FC<SearchBarContainerBarProps> = props => {
    const { apis, graphVars = {}, state } = props;
    const { visible } = state.searchBar;
    const { nodes } = graphVars.data;

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

    return (
        <div className="searchBar-container">
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
