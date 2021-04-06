import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, notification } from 'antd';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useDispatch, useSelector } from 'react-redux';

const { Panel } = Collapse;

interface DataSourceProps {}
let monacoRef;

const DataSource: React.FunctionComponent<DataSourceProps> = props => {
  const data = useSelector(state => state.data);

  const dispatch = useDispatch();

  const editorDidMount = editor => {
    console.log('editorDidMount', editor);
    editor.focus();
  };
  const handleSave = () => {
    const model = monacoRef.editor.getModel();
    const value = model.getValue();

    let data = { nodes: [], edges: [] };
    try {
      data = JSON.parse(value);
      dispatch({
        type: 'Update_Data',
        data,
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: `解析出错`,
        description: `请检查数据是否为严格JSON格式:${error}`,
        placement: 'topLeft',
      });
    }
  };

  const code = JSON.stringify(data, null, 2);

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={['basic-layout', 'sub-layout']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="数据编辑" key="basic-layout">
          <button onClick={handleSave}> save</button>
          <MonacoEditor
            ref={node => {
              monacoRef = node;
            }}
            width="100%"
            height="80vh"
            language="json"
            theme="vs-dark"
            value={code}
            options={{}}
            editorDidMount={editorDidMount}
          />
        </Panel>
        <Panel header="数据上传" key="sub-layout">
          正在开发中...
        </Panel>
      </Collapse>
    </div>
  );
};

export default DataSource;
