// @ts-nocheck
import * as Graphin from '@antv/graphin';
import { LayoutConfig, LayoutItem } from '@antv/graphin-components';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row, Col, Form, Divider, Tooltip, Dropdown, Menu } from 'antd';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import graphLayoutConfig from './defaultLayoutConfig';

import styles from './index.less';

import { debounce } from 'lodash-es';

const defaultValue = {};

const LayoutConfigPanel = ({ updateLayout, layoutConfig = graphLayoutConfig }) => {
  const [form] = Form.useForm();

  const { graph } = useContext(Graphin.GraphinContext);

  const [currentLayout, setCurrentLayout] = useState(layoutConfig.graphLayout_force as LayoutConfig[]);

  const [currentLayoutType, setCurrentLayoutType] = useState('force');
  const [content, setContent] = useState();

  const [layoutTipInfo, setLayoutTipInfo] = useState({
    text: layoutConfig.graphLayout_force[0].title,
    icon: layoutConfig.graphLayout_force[0].icon,
  });

  // 根据 Graph 的大小更新一遍默认系数
  useEffect(() => {
    const gWidth = graph.get('width');
    const gHeight = graph.get('height');
    const gWidthHalf = gWidth / 2;
    const gHeightHalf = gHeight / 2;
    Object.keys(layoutConfig).forEach(key => {
      const configs = layoutConfig[key][0];
      configs.items.map((item: LayoutItem) => {
        switch (item.label) {
          case 'center':
            if (item.defaultValue) {
              item.defaultValue[0] = gWidthHalf;
              item.defaultValue[1] = gHeightHalf;
            }
            break;
          case 'width':
            item.defaultValue = gWidth;
            break;
          case 'height':
            item.defaultValue = gHeight;
            break;
          case 'radius':
            item.defaultValue = Math.max(50, Math.min(gHeightHalf - 50, gWidthHalf - 50));
            break;
          default:
            break;
        }
        return item;
      });
    });
  }, []);

  // 切换布局
  const handleToggleLayout = value => {
    let type = '';
    const previousType = currentLayoutType;
    if (value) {
      // eslint-disable-next-line prefer-destructuring
      type = value.split('_')[1];
      setCurrentLayoutType(type);
    }

    if (graphLayoutConfig[value]) {
      const currentConfig = graphLayoutConfig[value][0];
      setCurrentLayout(graphLayoutConfig[value]);
      setLayoutTipInfo({
        text: currentConfig.title,
        // img: currentConfig.thumbnail
        icon: currentConfig.icon,
      });

      // 从当前布局中获取所有默认参数
      const configs = graphLayoutConfig[value][0].items;
      if (configs) {
        const defaultLayoutConfigs = {};
        configs.forEach(d => {
          defaultLayoutConfigs[d.label] = d.defaultValue;
        });

        updateLayout(previousType, type, defaultLayoutConfigs);
      }
    }
  };

  // 布局下拉选择器
  const layoutMenu = (
    <Menu>
      <Menu.Item>
        <Row style={{ width: 300, textAlign: 'center' }}>
          {Object.keys(layoutConfig).map(d => {
            const { icon: Icon } = layoutConfig[d][0];
            return (
              <Col
                key={d}
                span={12}
                style={{ textAlign: 'center', display: 'inline-flex', paddingLeft: 32, marginTop: 16 }}
                onClick={() => handleToggleLayout(d)}
              >
                {Icon && <Icon />}
                <p style={{ fontSize: 12, lineHeight: '100%', marginLeft: 8 }}>{layoutConfig[d][0].title}</p>
              </Col>
            );
          })}
        </Row>
      </Menu.Item>
    </Menu>
  );

  // 更新布局参数
  const updateLayoutConfig = (changedField, allFields, layoutType) => {
    const currentFields = { ...allFields, ...changedField };
    Object.keys(currentFields).forEach(key => {
      defaultValue[key] = currentFields[key];
    });
    const { x, y, ...others } = currentFields;
    const config = others;
    if (layoutType === 'grid') {
      config.begin = [x, y];
    } else {
      config.center = [x, y];
    }
    if (!config.sweep) config.sweep = undefined;
    if (!config.nodeSize) config.nodeSize = undefined;
    updateLayout(layoutType, layoutType, config);
    form.setFieldsValue(defaultValue);
  };

  // 更新布局参数需要 debounce，使用 callback 来限流
  const debounceChange = useCallback(
    debounce(
      (changedField, allFields, layoutType) => updateLayoutConfig(changedField, allFields, layoutType),
      currentLayoutType === 'force' ? 1000 : 500,
    ),
    [],
  );

  /**
   * 当字段值改变后，自动更新布局
   * @param changedField 改变了的字段
   * @param allFields 所有字段
   */
  const handleFieldValueChange = (changedField, allFields) => {
    // 限流，防止频繁重新布局
    debounceChange(changedField, allFields, currentLayoutType);
  };

  // 选中的布局类型变化时，更新布局参数界面、改变默认参数、
  useEffect(() => {
    const currentContent = currentLayout.map((config: LayoutConfig) => {
      const items = config.items.map((item: LayoutItem, index: number) => {
        const { component: Component, isSwitch, defaultValue: value, labelZh, ...otherProps } = item;
        const key = `${config.title}-${index}`;
        defaultValue[item.label] = item.defaultValue;

        if (item.label === 'center' || item.label === 'begin') {
          if (item.defaultValue) {
            const { defaultValue } = item;
            const [defaultValueX, defaultValueY] = defaultValue;
            defaultValue.x = defaultValueX;
            defaultValue.y = defaultValueY;
          }
        }

        return (
          <Form.Item
            id={item.label}
            key={key}
            label={
              <Tooltip title={item.description}>
                <span>{labelZh}</span>
              </Tooltip>
            }
            valuePropName={isSwitch ? 'checked' : undefined}
          >
            {isSwitch ? <Component defaultChecked={value} {...otherProps} /> : <Component {...otherProps} />}
          </Form.Item>
        );
      });

      return items;
    });
    form.setFieldsValue(defaultValue);
    const formContent = (
      <div className={styles.blockContainer}>
        <Form
          form={form}
          name={`${currentLayoutType}-config-form`}
          initialValues={defaultValue}
          onValuesChange={(changedField, allFields) => {
            handleFieldValueChange(changedField, allFields);
          }}
        >
          {currentContent}
        </Form>
      </div>
    );
    setContent(formContent);
  }, [currentLayoutType]);

  return (
    <div
      className={styles.draggablePanel}
      style={{
        top: 50,
        right: 30,
        height: '500px',
      }}
    >
      <Row className={styles.header}>
        <Col span={22} className={styles.title}>
          布局配置
        </Col>
        <Col span={2}>
          <span className={styles.collapseIcon}>
            <CloseOutlined />
          </span>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 8,
        }}
      >
        <Col span={24}>
          <Divider />
          <div style={{ fontWeight: 'bold' }}>切换布局</div>
        </Col>
        <Dropdown overlay={layoutMenu}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <layoutTipInfo.icon />
            <span style={{ fontSize: 14, marginRight: 8, marginLeft: 8 }}>{layoutTipInfo.text}</span>
            <DownOutlined />
          </Col>
        </Dropdown>
        <Col span={24}>
          <Divider />
          <div style={{ fontWeight: 'bold' }}>配置参数</div>
        </Col>
      </Row>
      <div
        className={styles.contentContainer}
        style={{
          display: 'block',
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default LayoutConfigPanel;
