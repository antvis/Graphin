import G6 from '@antv/g6';

import registerInnerMarker from '../icons/marker';
import { GraphinProps } from '../types';
import compiler from '../shape/render/compiler';
import SimplicityNode from '../shape/render/SimplicityNode';

import RegisterSimplicityLineEdge from '../shape/g6/LineEdge';
import RegisterLineEdge from '../shape/graph-studio/LineEdge';
import RegisterPolyEdge from '../shape/graph-studio/PolyEdge';
import RegisterLoopEdge from '../shape/graph-studio/LoopEdge';
import RegisterCircleNode from '../shape/graph-studio/CircleNode';
import RegisterRectNode from '../shape/graph-studio/RectNode';
import RegisterHexagonNode from '../shape/graph-studio/HexagonNode';
import RegisterPointNode from '../shape/graph-studio/PointNode';
import RegisterStubNode from '../shape/graph-studio/StubNode';
import graphinHighlight from '../behaviors/graphin-highlight';
import { registerFontFamily } from '../icons/iconFont';
import { BehaviorModeItem } from './init';

const defaultRegister = {
  nodeShape: () => {
    return [
      {
        name: 'CircleNode',
        register: () => {
          RegisterCircleNode(G6);
        },
      },
      {
        name: 'RectNode',
        register: () => {
          RegisterRectNode(G6);
        },
      },
      {
        name: 'HexagonNode',
        register: () => {
          RegisterHexagonNode(G6);
        },
      },
      {
        name: 'RegisterPointNode',
        register: () => {
          RegisterStubNode(G6);
        },
      },
      {
        name: 'StubNode',
        register: () => {
          RegisterPointNode(G6);
        },
      },
    ];
  },
  edgeShape: () => {
    return [
      {
        name: 'SimplicityLineEdge',
        register: () => {
          RegisterSimplicityLineEdge(G6);
        },
      },
      {
        name: 'LineEdge',
        register: () => {
          RegisterLineEdge(G6);
        },
      },
      {
        name: 'LoopEdge',
        register: () => {
          RegisterLoopEdge(G6);
        },
      },
      {
        name: 'PolyEdge',
        register: () => {
          RegisterPolyEdge(G6);
        },
      },
    ];
  },
  behavior: () => {
    return [
      {
        name: 'graphin-highlight',
        mode: 'default',
        options: {},
        register: () => {
          // TODO better support for registerBehavior
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          G6.registerBehavior('graphin-highlight', graphinHighlight as any);
        },
      },
    ];
  },
};

const defaultExtend: GraphinProps['extend'] = {
  nodeShape: () => {
    return [
      {
        name: 'SimplicityNode',
        render: SimplicityNode,
      },
    ];
  },
  marker: () => {
    return [];
  },
  icon: () => {
    return [];
  },
};

const dummyRegister = () => {
  return [];
};
const dummyExtend = () => {
  return [];
};
const dummyIcon = () => {
  return [];
};

const toUpperCaseWithFirst = (str: string): string => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

interface Mode {
  mode: string;
  type: string;
  [key: string]: string | number | boolean | undefined;
}

interface BehaviorMode {
  default: BehaviorModeItem[];
  [key: string]: BehaviorModeItem[];
}

const graphinRegister = (props: GraphinProps) => {
  const { extend = {}, register = {}, options = {} } = props;

  const defaultBehaviors = defaultRegister.behavior().filter((behavior) => {
    const behaviorName = behavior.name.split('-')[1];
    const disableName = `disable${toUpperCaseWithFirst(behaviorName)}`;
    return !options[disableName];
  });

  // props.register 处理
  const { nodeShape = dummyRegister, edgeShape = dummyRegister, behavior = dummyRegister } = register;
  const registerNodes = [...defaultRegister.nodeShape(), ...nodeShape(G6)];
  const registerEdges = [...defaultRegister.edgeShape(), ...edgeShape(G6)];
  const registerBehaviors = [...defaultBehaviors, ...behavior(G6)];

  registerNodes.forEach((item) => {
    item.register(G6);
  });
  registerEdges.forEach((item) => {
    item.register(G6);
  });
  const modes: Mode[] = [];

  registerBehaviors.forEach((item) => {
    item.register(G6);
    const { name, mode } = item;

    modes.push({
      mode,
      type: name,
      ...item.options,
    });
  });

  const initialValue: BehaviorMode = {
    default: [],
  };

  const behaviorMode = modes.reduce((acc, curr) => {
    const { mode, ...others } = curr;
    if (!acc[mode]) {
      acc[mode] = [];
    }
    acc[mode].push(others);
    return { ...acc };
  }, initialValue);

  // props.extend 处理
  const { icon = dummyIcon, nodeShape: ExNodeShape = dummyExtend, marker: ExMarker = dummyExtend } = extend;

  const extendNodes = [...defaultExtend.nodeShape!(), ...ExNodeShape()];
  const extendMarker = [...defaultExtend.marker!(), ...ExMarker()];

  extendNodes.forEach((item) => {
    compiler(item);
  });

  registerInnerMarker(extendMarker);
  registerFontFamily(icon());

  return behaviorMode;
};
export default graphinRegister;
