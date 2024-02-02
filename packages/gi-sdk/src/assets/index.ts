import { Panel } from './panel';
import { Sider } from './sider';
import { Header } from './header';
import { Copyright } from './copyright';
import { Toolbar } from './toolbar';
import { ContextMenu } from './context-menu';
import { Interaction } from './interaction';
import { Minimap } from './minimap';
import { Widgets } from './widgets';

const widgets = new Widgets();

/** Register internal assets. */
widgets.register('Interaction', Interaction);
widgets.register('Toolbar', Toolbar);
widgets.register('Minimap', Minimap);
widgets.register('ContextMenu', ContextMenu);

/** Export for external use */
export { widgets, Panel, Sider, Header, Copyright, Toolbar, Minimap, ContextMenu, Interaction };
