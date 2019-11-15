import React from 'react';
import { Icon } from 'antd';
import classes from 'classnames';
import { SearchBarProps } from './SearchBar';
import { SearchValue } from './interface';
import './SearchBar.less';

export interface SearchPanelProps extends SearchBarProps {
    /** 搜索面板数据  */
    rows: SearchValue[];
    /** 搜索面板是否可见  */
    isOpen: boolean;
    /** 历史记录是否可见  */
    isHistory: boolean;
    /** 搜索框关键字  */
    searchWords: string;
    /** 判断是否数组  */
    isArray: (rows: SearchValue[]) => boolean;
    /** 关闭搜索面板  */
    handleClosePanel: (searchWords: string) => void;
    /** 清除历史记录  */
    resetSearchHistory: () => void;
}

const SearchPanel: React.SFC<SearchPanelProps> = props => {
    const {
        rows,
        isOpen,
        isHistory,
        anchor = 'right',
        allowClear = false,
        searchWords,
        isArray,
        handleClosePanel,
        resetSearchHistory,
    } = props;

    const highlight = (words: string, str: string) => {
        // 对搜索的关键字分词，这里使用简单的空格分词
        const searchwordsArray = words.split(' ');
        let string = str;
        // 这里如果localStorage存储的数据格式发生变化容易报错，需要try...catch一下
        try {
            // 对每个关键词进行replace替换
            searchwordsArray.forEach(e => {
                if (!e.trim()) {
                    return;
                }
                string = string.replace(e, match => `<span style="font-weight:700">${match}</span>`);
            });
            return string;
        } catch (error) {
            console.log(error); // eslint-disable-line
            return string;
        }
    };

    const onClick = (item: SearchValue) => {
        if (props.onSelect) {
            props.onSelect(item);
        }
        setTimeout(() => handleClosePanel(item.name), 300);
    };

    const blank = () => <p className="search-blank">无搜索内容</p>;

    const renderHeader = () => {
        if (props.renderHeader) {
            return props.renderHeader(rows);
        }

        return (
            isHistory && (
                <li className="li-recent">
                    <i className="recent-icon">
                        <Icon type="history" style={{ color: '#adb9c6' }} />
                    </i>
                    最近访问
                </li>
            )
        );
    };

    const renderContent = () => {
        return isArray(rows) ? (
            <ul className="search-panel-ul">
                {rows.map((item, index) => {
                    // 默认的renderContent
                    let text;
                    if (props.renderContent) {
                        text = props.renderContent({
                            item,
                            highlight,
                            searchWords,
                        });
                    } else {
                        text = highlight(searchWords, item.name);
                    }
                    return (
                        <li key={JSON.stringify(item)}>
                            {/* eslint-disable-next-line */}
                            <div
                                tabIndex={index}
                                role="button"
                                dangerouslySetInnerHTML={{ __html: text }} // eslint-disable-line
                                onClick={() => {
                                    onClick(item);
                                }}
                                onKeyPress={() => {
                                    onClick(item);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        ) : (
            blank()
        );
    };

    const reset = () => {
        if (props.clearHistory) {
            props.clearHistory();
            resetSearchHistory();
        }
    };

    const renderFooter = () => {
        const visible = allowClear && isHistory;
        return visible ? (
            <div className="li-footer">
                <i className="reset-icon">
                    <Icon type="rest" style={{ color: '#adb9c6' }} />
                </i>
                <span role="button" tabIndex={0} className="reset-button" onClick={reset} onKeyPress={reset}>
                    清除历史记录
                </span>
            </div>
        ) : null;
        // if (props.renderFooter) {
        //   return props.renderFooter(rows);
        // }
        // return null;
    };

    const rootClass = classes(
        'search-panel',
        // cx[`search-direction-${anchor}`],
        anchor === 'left' ? 'search-direction-left' : 'search-direction-right', // 伸缩的方向
        {
            close: !isOpen,
            blank: !isArray(rows),
        },
    );
    return (
        <div className={rootClass}>
            {renderHeader()}
            {renderContent()}
            {renderFooter()}
        </div>
    );
};

export default SearchPanel;
