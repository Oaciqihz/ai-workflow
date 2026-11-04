"use client";

import { useMemo } from "react";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { cn } from "cn";

import { SelectedNodeToolbar } from "@/components/editor/node-toolbar";
import { ZoomPanel } from "@/components/editor/zoom-panel";
import { useFlow } from "@/hooks/use-flow";
import { useFlowSelection } from "@/hooks/use-flow-selection";
import { initialEdges, initialNodes } from "@/lib/flow/initial-elements";

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

  return (
    <div className={cn("h-dvh w-full", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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

        <SelectedNodeToolbar node={selectedNode} onUpdateData={updateNodeData} />
      </ReactFlow>
    </div>
  );
}
