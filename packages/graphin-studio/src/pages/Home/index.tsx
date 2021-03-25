import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

const { Meta } = Card;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Home = () => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">可视分析</Menu.Item>
        <Menu.Item key="2">数据服务</Menu.Item>
        <Menu.Item key="3">物料管理</Menu.Item>
        <Menu.Item key="4">应用管理</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>可视分析</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ width: 300 }} bordered={false} hoverable>
                <Link to="/studio">
                  <div className="card-item">
                    <PlusOutlined />
                  </div>
                  <div className="card-item">新建分析画布</div>
                </Link>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: 300 }} bordered={false} hoverable>
                <div className="card-item">
                  <CopyOutlined />
                </div>
                <div className="card-item">分析画布-1</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: 300 }} bordered={false} hoverable>
                <div className="card-item">
                  <CopyOutlined />
                </div>
                <div className="card-item">分析画布-2</div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);

export default Home;
