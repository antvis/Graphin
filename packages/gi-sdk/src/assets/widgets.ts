export class Widgets {
  public widgets: Map<string, React.FC<any>>;
  constructor() {
    this.widgets = new Map();
  }
  /**
   * @description 注册组件
   * @param {string} name 组件名称
   * @param {Widget} widget 组件
   */
  register(name: string, widget: React.FC<any>) {
    this.widgets.set(name, widget);
  }
  /**
   * @description 注销组件
   * @param {string} name 组件名称
   */
  unregister(name: string) {
    this.widgets.delete(name);
  }
  /**
   * @description 获取组件
   * @param {string} name 组件名称
   */
  get(name: string) {
    return this.widgets.get(name);
  }
}
