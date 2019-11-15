import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Input, Icon } from 'antd';
import SearchPanel from './Panel';
import { SearchValue, ContentProps } from './interface';
import './SearchBar.less';

const DEBOUNCE_TIME = 500;
const ENTER_KEY = 13;

export interface SearchBarProps {
    /** 文本框值变化时回调  */
    onSearch: (value: string) => Promise<SearchValue[]>;
    /** 被选中时调用  */
    onSelect?: (e: SearchValue) => void;
    /** 查询历史记录  */
    onSearchHistory?: () => Promise<SearchValue[]>;
    /** 搜索回车事件  */
    onEnter?: (value: string) => Promise<SearchValue[]>;
    /**
     * <@default=true>
     * 搜索框是否可见
     */
    visible?: boolean;
    /**
     * <@default='right'>
     * searchbar展开的方向
     */
    anchor?: 'left' | 'right';
    /**
     * <@default=false>
     * 是否自动聚焦
     */
    isFocus?: boolean;
    /**
     * <@default=false>
     * 清除历史记录按钮是否可见
     */
    allowClear?: boolean;
    /** 输入框底文  */
    placeholder?: string;
    /** 自定义搜索结果面板的Header  */
    renderHeader?: (rows: SearchValue[]) => void;
    /** 自定义搜索结果面板的Content  */
    renderContent?: (options: ContentProps) => string;
    /** 点击清除历史记录按钮回调  */
    clearHistory?: () => void;
}

interface InitialState {
    rows: SearchValue[];
    searchWords: string;
    isOpen: boolean;
    isHistory: boolean;
}

// 判断传入数据是否为数组且不为空
// eslint-disable-next-line
const isArray = (data: any): boolean => {
    // eslint-disable-line
    if (Array.isArray(data)) {
        return !!data.length;
    }
    return false;
};

const SearchBar: React.SFC<SearchBarProps> = props => {
    const { isFocus = false, visible = true, placeholder } = props;
    const [state, setState] = useState<InitialState>({
        isOpen: false,
        isHistory: false,
        searchWords: '',
        rows: [],
    });
    const { isOpen, isHistory, searchWords, rows } = state;

    // 点击空白搜索面板消失
    const hideSearchPanel = (e: MouseEvent): void => {
        const tmpNode: HTMLDivElement = document.createElement('div');
        const node: any = e.target; // eslint-disable-line
        tmpNode.appendChild(node.cloneNode(true));
        if (tmpNode.innerHTML.indexOf('input') !== 1 && isOpen) {
            setState({ ...state, isOpen: false });
        }
    };

    const queryFuzzy = (newState: InitialState): void => {
        // const { searchWords } = newState;
        props.onSearch(newState.searchWords).then(res => {
            setState({ ...newState, rows: res, isHistory: false });
        });
    };

    const queryHistory = (newState: InitialState): void => {
        if (props.onSearchHistory) {
            props.onSearchHistory().then(res => {
                setState({
                    ...newState,
                    rows: res,
                    isHistory: !!isArray(res),
                });
            });
        }
    };

    const onSearch = (newState: InitialState): void => {
        // const { searchWords } = newState;
        if (!newState.searchWords && props.onSearchHistory) {
            // 当输入为空的时候显示历史搜索记录：初次进入/清空搜索字段
            queryHistory(newState);
        } else {
            queryFuzzy(newState);
        }
    };

    const onFocus = (): void => {
        // 历史消息
        if (!searchWords && props.onSearchHistory) {
            props.onSearchHistory().then(res => {
                setState({
                    ...state,
                    isOpen: true,
                    isHistory: !!isArray(res),
                    rows: res,
                });
            });
        } else {
            props.onSearch(searchWords).then(res => {
                setState({ ...state, rows: res, isOpen: true });
            });
        }
    };

    const handleClosePanel = (e = ''): void => {
        setState({
            searchWords: e,
            isHistory: false,
            isOpen: false,
            rows: [],
        });
    };

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.keyCode === ENTER_KEY && props.onEnter) {
            props.onEnter(searchWords);
            handleClosePanel(searchWords);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setState({ ...state, searchWords: e.target.value });
    };

    const resetSearchHistory = (): void => {
        setState({
            ...state,
            isOpen: true,
            isHistory: false,
            rows: [],
        });
    };

    // 直接在useEffect内执行debounce无效，可以使用useRef把函数存起来
    // 注意：useRef保存的state是之前的，必须将当前的state作为参数传进来，否则后面setState会有问题
    const debounce = useRef(_.debounce((newState: InitialState) => onSearch(newState), DEBOUNCE_TIME));

    useEffect(() => {
        document.addEventListener('click', hideSearchPanel);
        return (): void => {
            document.removeEventListener('click', hideSearchPanel);
        };
    });

    useEffect(() => {
        if (!visible) {
            handleClosePanel();
        }
    }, [visible]);

    useEffect(() => {
        if (visible) {
            debounce.current(state);
        }
    }, [searchWords]);

    return visible ? (
        <div className="wrapper">
            <Input
                // ref={el => (el ? el.focus() : null)}
                ref={(el): void => {
                    if (el && isFocus && !searchWords) {
                        el.focus();
                    }
                }}
                // allowClear
                value={searchWords}
                placeholder={placeholder}
                prefix={<Icon type="search" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                onFocus={onFocus}
                onPressEnter={onEnter}
                onChange={(e): void => onChange(e)}
            />
            <SearchPanel
                {...props}
                rows={rows}
                isOpen={isOpen}
                isHistory={isHistory} // 是否显示历史访问的info
                searchWords={searchWords}
                isArray={isArray}
                handleClosePanel={handleClosePanel}
                resetSearchHistory={resetSearchHistory}
            />
        </div>
    ) : null;
};

export default SearchBar;
