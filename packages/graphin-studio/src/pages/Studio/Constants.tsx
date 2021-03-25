import Algorithm from '@/components/Panel/Algorithm';
import Component from '@/components/Panel/Component';
import Filter from '@/components/Panel/Filter';
import LayoutPanel from '@/components/Panel/Layout';
import Statistics from '@/components/Panel/Statistics';
import Style from '@/components/Panel/Style';
import System from '@/components/Panel/System';
import { DatabaseOutlined } from '@ant-design/icons';
import React from 'react';

export const navbarOptions = [
  // {
  //   id: 'source',
  //   name: '数据',
  //   icon: <DatabaseOutlined />,
  // },
  {
    id: 'statistics',
    name: '统计',
    icon: <DatabaseOutlined />,
  },
  {
    id: 'style',
    name: '样式',
    icon: <DatabaseOutlined />,
  },
  {
    id: 'components',
    name: '组件',
    icon: <DatabaseOutlined />,
  },
  {
    id: 'layout',
    name: '布局',
    icon: <DatabaseOutlined />,
  },
  {
    id: 'filter',
    name: '过滤',
    icon: <DatabaseOutlined />,
  },
  {
    id: 'algorithm',
    name: '算法',
    icon: <DatabaseOutlined />,
  },
  {
    id: 'system',
    name: '系统',
    icon: <DatabaseOutlined />,
  },
];

export const configSchema = [
  {
    id: 'statistics',
    name: '统计',
    icon: <DatabaseOutlined />,
    components: Statistics,
  },
  {
    id: 'style',
    name: '样式',
    icon: <DatabaseOutlined />,
    components: Style,
  },
  {
    id: 'components',
    name: '组件',
    icon: <DatabaseOutlined />,
    components: Component,
  },
  {
    id: 'layout',
    name: '布局',
    icon: <DatabaseOutlined />,
    components: LayoutPanel,
  },
  {
    id: 'filter',
    name: '过滤',
    icon: <DatabaseOutlined />,
    components: Filter,
  },
  {
    id: 'algorithm',
    name: '算法',
    icon: <DatabaseOutlined />,
    components: Algorithm,
  },
  {
    id: 'system',
    name: '系统',
    icon: <DatabaseOutlined />,
    components: System,
  },
];
