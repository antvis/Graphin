//@ts-nocheck
import * as React from 'react';
import { Radio, Input, InputNumber } from 'antd';
import Item from './Item';
import { FontSizeOutlined, LinkOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import GraphinColorPick from './ColorPicker';
import { NodeStyle } from '@antv/graphin';

interface IconSettingProps extends NodeStyleIcon {
  handleChange: (schena: { icon: NodeStyleIcon }) => void;
}

export type NodeStyleIcon = Partial<NodeStyle['icon']>;

const IconSetting = (props: IconSettingProps) => {
  const { handleChange, fill, size, type: IconType } = props;

  const [state, setState] = React.useState({
    type: IconType,
    types: [
      {
        id: 'font',
        name: '字体图标',
      },
      {
        id: 'image',
        name: '图片',
      },
      {
        id: 'text',
        name: '文本',
      },
    ],
  });

  const { type, types } = state;

  const handleChangeType = v => {
    console.log('v', v);
    setState({
      ...state,
      type: v.target.value,
    });
  };

  const handleChangeValue = e => {
    handleChange({
      icon: {
        type,
        value: e.target.value,
      },
    });
  };

  return (
    <>
      <Item title="类型">
        <Radio.Group defaultValue={type} size="small" style={{ width: '100%' }} onChange={handleChangeType}>
          {types.map(item => {
            return (
              <Radio.Button value={item.id} key={item.id}>
                {item.name}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Item>

      {type === 'image' && (
        <Item title="图片地址">
          <Input size="small" placeholder="输入图片地址" prefix={<LinkOutlined />} onPressEnter={handleChangeValue} />
        </Item>
      )}
      {type === 'text' && (
        <Item title="文本内容">
          <Input size="small" placeholder="输入文本" prefix={<FontSizeOutlined />} onPressEnter={handleChangeValue} />
        </Item>
      )}

      {/** TODO:改为在线可搜索的图标 */}
      {type === 'font' && (
        <Item title="字体图标">
          <Input
            size="small"
            placeholder="输入Icon"
            prefix={<AppstoreAddOutlined />}
            onPressEnter={handleChangeValue}
          />
        </Item>
      )}
      <Item title="大小">
        <InputNumber
          size="small"
          min={1}
          max={100000}
          defaultValue={size as number}
          onChange={e => {
            handleChange({
              icon: {
                size: Number(e),
              },
            });
          }}
        />
      </Item>
      <Item title="填充色">
        <GraphinColorPick
          color={fill as string}
          onChange={val => {
            handleChange({
              icon: {
                fill: val,
              },
            });
          }}
        />
      </Item>
    </>
  );
};

export default IconSetting;
