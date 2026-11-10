"use client";

import { useMemo } from "react";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { cn } from "cn";

import { SelectedNodeToolbar } from "@/components/editor/node-toolbar";
import { nodeTypes } from "@/components/editor/nodes";
import { ZoomPanel } from "@/components/editor/zoom-panel";
import { useFlow } from "@/hooks/use-flow";
import { useFlowSelection } from "@/hooks/use-flow-selection";
import { initialEdges, initialNodes } from "@/lib/flow/initial-elements";
import type { IncomingConnection } from "@/types/flow";

import "./flow-canvas.css";

type FlowCanvasProps = {
  className?: string;
};

/**
 * 画布装配层：
 * 状态来自 useFlow / useFlowSelection，画布内的控件（缩放条、节点浮层）
 * 都挂在这里，页面本身只负责引入。
 */
export function FlowCanvas({ className }: FlowCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeData,
  } = useFlow({ initialNodes, initialEdges });

  const { selectedId, onSelectionChange, clearSelection } = useFlowSelection();

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedId) ?? null,
    [nodes, selectedId],
  );

  /**
   * 选中节点的入边。
   * 连线不在 node 里，节点对象永远不知道自己连着谁——所以必须在这里用
   * edges + nodes 两份状态算出来，再传给表单。
   * 依赖 edges 是必须的：新建一条连线时这个 memo 要重算，否则表单看到的是旧的。
   */
  const incoming = useMemo<IncomingConnection[]>(() => {
    if (!selectedNode) return [];

    return edges
      .filter((edge) => edge.target === selectedNode.id)
      .map((edge) => ({
        edge,
        sourceNode: nodes.find((node) => node.id === edge.source),
      }))
      // 过滤掉 source 指向已删除节点的悬空边
      .filter((item): item is IncomingConnection => Boolean(item.sourceNode));
  }, [edges, nodes, selectedNode]);

  return (
    <div className={cn("h-dvh w-full", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onPaneClick={clearSelection}
        fitView
      >
        <Background
          color="#ccc"
          bgColor="#eef5f6"
          variant={BackgroundVariant.Dots}
        />

        <ZoomPanel />

        <SelectedNodeToolbar
          node={selectedNode}
          incoming={incoming}
          onUpdateData={updateNodeData}
        />
      </ReactFlow>
    </div>
  );
}
