import React from 'react';
import { render, act, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getMockG6Event, getMockGraph } from '../../../../__mock__/g6';
import { ContextMenu, isEqual, ContextMenuProps } from '../index';
import getPosition from '../getPosition';

const mockGraph = getMockGraph();
const mockG6Event = getMockG6Event();

interface PropType {
  graph: any; // eslint-disable-line
  options: ContextMenuProps['options'];
  render: ContextMenuProps['render'];
}

describe('<ContextMenu />', () => {
  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  it('rendenrs menu when trigger contextmenu event', () => {
    const mockCallback = jest.fn(() => {});

    // TODO icon 测试
    const { asFragment, queryByText, rerender, getByText, unmount } = render(
      <ContextMenu
        graph={mockGraph}
        options={[
          {
            key: 'select',
            title: 'Select',
            iconType: 'icon',
            visible: true,
            onClick: mockCallback,
          },
          {
            key: 'invert-select',
            title: 'Invert Select',
            iconType: 'icon',
            visible: false,
            onClick: () => {},
          },
          {
            key: 'delete',
            title: 'Delete',
            visible: true,
            render: () => <div>Delete</div>,
          },
        ]}
      />,
    );
    expect(asFragment().children.length).toEqual(0);
    act(() => {
      mockGraph.emit('node:contextmenu', mockG6Event);
    });

    // 菜单是否正确显示
    expect(asFragment().children.length).not.toEqual(0);
    expect(queryByText(/Select/)).toBeTruthy();
    expect(queryByText(/Invert Select/)).toBeFalsy();
    expect(queryByText(/Delete/)).toBeTruthy();

    act(() => {
      fireEvent.click(getByText(/Select/), {});
      fireEvent.click(getByText(/Delete/), {});
    });

    expect(mockCallback).toBeCalled(); // 菜单点击 callback 是否被调用
    expect(asFragment().children.length).toEqual(0); // 点击菜单 item 后，菜单是否隐藏

    // render function invalid
    rerender(
      <ContextMenu
        graph={mockGraph}
        // eslint-disable-next-line
        render={(): any => {
          return 1;
        }}
      />,
    );
    act(() => {
      mockGraph.emit('node:contextmenu', mockG6Event);
    });
    act(() => {
      mockGraph.emit('canvas:click', mockG6Event); // reset
    });

    // 测试自定义菜单
    rerender(
      <ContextMenu
        graph={mockGraph}
        render={() => {
          return (
            <ul>
              <li>User Defined Item 1</li>
              <li>User Defined Item 2</li>
              <li>User Defined Item 3</li>
            </ul>
          );
        }}
      />,
    );

    expect(asFragment().children.length).toEqual(0);

    act(() => {
      mockGraph.emit('node:contextmenu', mockG6Event);
    });
    // 菜单是否正确显示
    expect(asFragment().children.length).not.toEqual(0);
    expect(queryByText(/User Defined Item 1/)).toBeTruthy();

    // Menu should hide when click canvas
    act(() => {
      mockGraph.emit('canvas:click', mockG6Event);
    });
    expect(asFragment().children.length).toEqual(0);

    // Contextmenu event should not be active when ctrl keydown
    act(() => {
      mockGraph.emit('keydown', { keyCode: 10 });
      mockGraph.emit('keydown', { keyCode: 17 });
      mockGraph.emit('keydown', { which: 17 });
    });
    act(() => {
      mockGraph.emit('node:contextmenu', mockG6Event);
    });
    expect(asFragment().children.length).toEqual(0);

    // Contextmenu event should be active when keyup
    act(() => {
      mockGraph.emit('keyup', {});
    });
    act(() => {
      mockGraph.emit('node:contextmenu', mockG6Event);
    });
    expect(asFragment().children.length).not.toEqual(0);
  });

  it('should rerender when render prop change', () => {
    const options = [
      {
        key: 'select',
        text: 'Select',
        icon: 'icon',
        visible: true,
        onClick: () => {},
      },
    ];
    const renderFunc = () => <div>foo</div>;

    const prevProps: PropType = { graph: {}, options, render: renderFunc };
    const optionsChangeProps: PropType = { graph: {}, options, render: renderFunc };
    const renderChangeProps: PropType = { graph: {}, options, render: renderFunc };

    expect(isEqual(prevProps, optionsChangeProps)).toBeTruthy();
    expect(isEqual(prevProps, renderChangeProps)).toBeTruthy();

    optionsChangeProps.options = [
      {
        key: 'select',
        title: 'Select',
        iconType: 'icon',
        visible: false,
        onClick: () => {},
      },
    ];
    expect(isEqual(prevProps, optionsChangeProps)).toBeFalsy();

    renderChangeProps.render = () => <div>bar</div>;
    expect(isEqual(prevProps, renderChangeProps)).toBeFalsy();
  });

  it('should calculate right position', () => {
    let g6Event = getMockG6Event({ x: 100, y: 100 }) as any; // eslint-disable-line
    expect(getPosition(mockGraph, g6Event, { width: 250, height: 300 })).toEqual({ x: 100, y: 100 });

    g6Event = getMockG6Event({ x: 900, y: 900 }) as any; // eslint-disable-line
    expect(getPosition(mockGraph, g6Event, { width: 250, height: 300 })).toEqual({ x: 650, y: 600 });
  });
});
