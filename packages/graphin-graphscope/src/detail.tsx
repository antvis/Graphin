// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { Table, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { NodeData } from './graph.tsx';
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
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Value',
      key: 'value',
      dataIndex: 'value',
    },
  ];

  const [propertiesData, setPropertiesData] = useState([]);
  useEffect(() => {
    if (data.properties) {
      const tmpData = [];
      for (const key in data.properties) {
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
  const itemTypeZH = type === 'NODE' ? 'Node' : 'Edge';
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
        <div style={{ height: '100%', overflow: 'auto' }}>
          <Row className={classNames(styles.header, 'handle')}>
            <Col span={22} className={styles.title}>
              {`${itemTypeZH} Detail Information`}
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
              {itemTypeZH} Type：{data.label}
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
