import { ClickSelect, BrushSelect } from '@antv/graphin';
import { Panel } from './panel';
import { Sider } from './sider';
import { Header } from './header';
import { Copyright } from './copyright';
import { Toolbar } from './toolbar';
import { ContextMenu } from './context-menu';
import { ClickNode } from './interaction';
import { Minimap } from './minimap';
import { Widgets } from './widgets';
import { ChangeLanguage } from './change-language';

const widgets = new Widgets();

/** Register internal assets. */
widgets.register('ClickSelect', ClickSelect);
// widgets.register('BrushSelect', BrushSelect);
widgets.register('ClickNode', ClickNode);
widgets.register('Toolbar', Toolbar);
widgets.register('Minimap', Minimap);
widgets.register('ContextMenu', ContextMenu);

/** Export for external use */
export { widgets, Panel, Sider, Header, Copyright, Toolbar, Minimap, ContextMenu, ChangeLanguage };
