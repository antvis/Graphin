---
title: Options 配置
order: 3
---

Graphin 提供了 `props.options` 来对行为和显示进行高级配置。

具体的 API，详见 [API 文档](/zh/docs/api/graphin#options)。

下面对配置中比较常用的几类进行演示：


### 配置画布行为和展示细节

Graphin 对画布的缩放，平移和节点拖拽开放了配置：

<iframe
     src="https://codesandbox.io/embed/graphin-layout-dagre-8j1dl?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="graphin-options-zoom"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

可以修改配置，并对画布和节点进行交互，体验不同配置的不同之处。

### 配置力导时拖拽

Graphin 对于力导布局时节点的拖拽行为，开放了两个配置：

<iframe
     src="https://codesandbox.io/embed/graphin-options-zoom-ed84y?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="graphin-options-force"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

可以尝试拖动节点，并这两个配置，体验拖拽后的不同之处。

### 配置 KeyShape 优化

Graphin 对用户缩小图形时，会只显示节点的 KeyShape，而不展示节点内部的细节。这样可以优化缩放的性能。您可以在 options 中对这个行为进行配置：


<iframe
     src="https://codesandbox.io/embed/graphin-options-zoom-u5k9z?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="graphin-options-zoom"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

可以修改配置，体验不同配置对 KeyShape 优化的影响。