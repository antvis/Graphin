import * as React from 'react';
import { useSelector } from 'react-redux';
import './index.less';

interface Option {
  /** 配置的内容 */
  content: React.ReactElement | JSX.Element | JSX.Element[];
  /** 配置的ID */
  id: string;
  /** 配置的名称 */
  name: string;
}
interface ConfigationPanelProps {
  options: Option[];
  value: Option['id'];
}

const ConfigationPanel: React.FunctionComponent<ConfigationPanelProps> = props => {
  const { options, value } = props;
  const state = useSelector(state => state);
  console.log('state', state, options, value);
  const MatchContent = options.find(opt => {
    return opt.id === value;
  });

  return (
    <div className="studio-config-pannel">
      <MatchContent.components />
    </div>
  );
};

export default ConfigationPanel;
