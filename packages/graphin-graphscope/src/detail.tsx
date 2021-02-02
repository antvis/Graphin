import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { Table, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
// @ts-ignore
import classNames from 'classnames';
import { NodeData } from './graph';

// @ts-ignore
import styles from './detail.less';

interface DetailProps {
  close: () => void;
  data: NodeData;
  type: 'NODE' | 'EDGE';
  itemId: string;
}

const ElementDetailPanel: React.FC<DetailProps> = ({ close, type, itemId, data = {} }) => {
  const columns = [
    {
      title: '字段名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '值',
      key: 'value',
      dataIndex: 'value',
    },
  ];

  const [propertiesData, setPropertiesData] = useState([]);
  useEffect(() => {
    if (data.properties) {
      const tmpData = [];
      for (let key in data.properties) {
        tmpData.push({
          key,
          name: key,
          type: typeof data.properties[key],
          value: data.properties[key],
        });
      }

      setPropertiesData(tmpData);
    }
  }, [data.id]);
  const itemTypeZH = type === 'NODE' ? '节点' : '边';
  return (
    <Draggable handle=".handle" position={null} scale={1}>
      <Resizable
        defaultSize={{
          width: 331,
          height: 350,
        }}
        style={{
          padding: 16,
          position: 'absolute',
          top: 40,
          right: 0,
          zIndex: 3,
          backgroundColor: '#f0f0f0',
          borderRadius: 6,
          boxShadow: '0 5px 18px 0 rgba(255, 255, 255, 0.6)',
          transition: 'height 0.3s ease',
        }}
      >
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <Row className={classNames(styles.header, 'handle')}>
            <Col span={22} className={styles.title}>
              {`${itemTypeZH}详情`}
            </Col>
            <Col span={2}>
              <span className={styles.collapseIcon} onClick={() => close()}>
                <CloseOutlined />
              </span>
            </Col>
          </Row>
          <div className={styles.contentContainer}>
            <p>
              {itemTypeZH} ID：{itemId}
            </p>
            <p>
              {itemTypeZH}类型：{data.label}
            </p>
            <Table
              columns={columns}
              size="small"
              dataSource={propertiesData}
              pagination={{
                hideOnSinglePage: true,
                size: 'small',
                simple: true,
                pageSize: 8,
              }}
            />
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default ElementDetailPanel;
