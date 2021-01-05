import * as React from 'react';
import { Radio, Input, InputNumber } from 'antd';
import Item from './Item';
import { FontSizeOutlined } from '@ant-design/icons';
import GraphinColorPick from './ColorPicker';

interface LabelSettingProps extends NodeStyleLabel {
  handleChange: (schena: { label: NodeStyleLabel }) => void;
}

export type NodeStyleLabel = Partial<{
  /** label的名称 */
  value: string;
  /** 展示位置 */
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /** 文本填充色 */
  fill: string;
  /** 文本大小 */
  fontSize: number;
  /** 文本在各自方向上的偏移量，主要为了便于调整文本位置 */
  offset: number;
}>;

const positions = ['top', 'bottom', 'left', 'right', 'center'];

const LabelSetting: React.FunctionComponent<LabelSettingProps> = (props) => {
  const { handleChange, fill, fontSize, value, position, offset } = props;

  return (
    <React.Fragment>
      <Item title="位置">
        <Radio.Group
          defaultValue={position}
          size="small"
          style={{ width: '100%' }}
          onChange={(e) => {
            handleChange({
              label: {
                position: e.target.value,
              },
            });
          }}
        >
          {positions.map((item) => {
            return (
              <Radio.Button value={item} key={item}>
                {item}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Item>

      {/* <Item title="内容">
        <Input
          size="small"
          placeholder="输入文本"
          prefix={<FontSizeOutlined />}
          onPressEnter={(e: any) => {
            handleChange({
              label: {
                value: e.target.value,
              },
            });
          }}
        />
      </Item> */}

      <Item title="大小">
        <InputNumber
          size="small"
          min={1}
          max={100000}
          defaultValue={fontSize}
          onChange={(e) => {
            handleChange({
              label: {
                fontSize: e,
              },
            });
          }}
        />
      </Item>
      <Item title="颜色">
        <GraphinColorPick
          color={fill as string}
          onChange={(val) => {
            handleChange({
              label: {
                fill: val,
              },
            });
          }}
        />
      </Item>
    </React.Fragment>
  );
};

export default LabelSetting;
