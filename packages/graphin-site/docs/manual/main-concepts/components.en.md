---
title: Components 
order: 2
---

The analysis process is a dynamic interaction process. There is no exception of the graph analysis So we need some analysis components to help us. There are two built-in components in Graphin: Toobar and ContextMenu.

> MiniMap and ProptertiesFilter Component are in the planning.

## 01.Toolbar

Toolbar includes 4 built-in features

#### Features

-   todo/redo

We provide the ability to undo and redo, which makes the entire analysis process reliable, because users no longer have to worry about ruining the previous analysis process because of misuse. For tool-based products, this is the basic function and the feature.

-   zoomIn/out 

During the analysis process, when the number of nodes or the layout changes, some nodes may not be in the current window. At this time, we need the zoom function to help us adjust the scope of the window. With the drag and drop of the canvas, we will not lose the global (zoomOut) and detail (zoomIn).


-   fullscreen

After the trigger, the entire canvas fills the browser window, which is very useful when your canvas page is small in the entire screen.

-   foucs

After entering the node ID, the graph will automatically focus on the node. This function can be used with the Search function to support fuzzy search and fast positioning, which will greatly improve your analysis efficiency.

-   Snapshot  snapshot download
    Downloading a snapshot will be a very useful feature when you want to save the current canvas for sharing.

## 02.ContextMenu 

#### Features

On the canvas, we right click on the node and a menu will appear. We can customize the operation options of the ContextMenu. If the Toolbar is for the entire canvas operation, then the ContextMenu will operate on a single node. For a single node, our general analysis operation has as follows:

-   Copy

Copy the node ID for some operations.

-   Inverse selection

Inverse selection is a shortcut to select other nodes.

-   Delete

After tdeleting the node, the remaining nodes will be re-layout and rendered. when we do the case investigation, The re-layout analysis can reduce our analysis interference after deleting the identified key nodes.

-   Add canvas

When we select the key nodes in the previous analysis, we can do a second analysis in a new canvas by right-click menu which will reduce the interference of useless information.


-   Business related

Some operations specific to a node, such as marking the node, spreading the relationship, or initiating a data request.
