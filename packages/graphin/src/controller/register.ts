import G6 from '@antv/g6';

import registerInnerMarker from '../icons/marker';
import { GraphinProps } from '../types';
import compiler from '../shape/render/compiler';
import CircleNode from '../shape/render/CircleNode';

import RegisterLineEdge from '../shape/g6/LineEdge';
import RegisterCanonicalLineEdge from '../shape/graph-studio/LineEdge';
import RegisterCanonicalCircleNode from '../shape/graph-studio/CircleNode';
import RegisterCanonicalRectNode from '../shape/graph-studio/RectNode';
import RegisterCanonicalHexagonNode from '../shape/graph-studio/HexagonNode';
import graphinHighlight from '../behaviors/graphin-highlight';
import { registerFontFamily } from '../icons/iconFont';
import { BehaviorModeItem } from './init';

const defaultRegister = {
  nodeShape: () => {
    return [
      {
        name: 'CanonicalCircleNode',
        register: () => {
          RegisterCanonicalCircleNode(G6);
        },
      },
      {
        name: 'CanonicalRectNode',
        register: () => {
          RegisterCanonicalRectNode(G6);
        },
      },
      {
        name: 'CanonicalHexagonNode',
        register: () => {
          RegisterCanonicalHexagonNode(G6);
        },
      },
    ];
  },
  edgeShape: () => {
    return [
      {
        name: 'LineEdge',
        register: () => {
          RegisterLineEdge(G6);
        },
      },
      {
        name: 'CanonicalLineEdge',
        register: () => {
          RegisterCanonicalLineEdge(G6);
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
          G6.registerBehavior('graphin-highlight', graphinHighlight);
        },
      },
    ];
  },
};

const defaultExtend: GraphinProps['extend'] = {
  nodeShape: () => {
    return [
      {
        name: 'CircleNode',
        render: CircleNode,
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
