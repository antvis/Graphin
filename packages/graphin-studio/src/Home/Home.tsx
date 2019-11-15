import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../logo.svg';

const Home = () => {
    return (
        <div className="container">
            <div className="card">
                <img
                    width="100%"
                    src="https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*EkJmRrmuJAgAAAAAAAAAAABkARQnAQ"
                    alt=""
                />
            </div>
            <div className="card">
                <Link to="/graphin-studio" className="card-item">
                    <div className="card-text">
                        {`
                            演示demo：Graphin Studio
                                --- 通用图分析工作台
                            `}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
