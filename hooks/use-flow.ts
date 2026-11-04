"use client";

import { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";

import type { FlowEdge, FlowNode, FlowNodeDataPatch } from "@/types/flow";

type UseFlowOptions = {
  initialNodes?: FlowNode[];
  initialEdges?: FlowEdge[];
};

/**
 * 画布状态中枢：节点 / 连线的增删改与拖拽。
 * 所有 ReactFlow 的受控回调都在这里收口，组件层只负责渲染。
 */
export function useFlow({
  initialNodes = [],
  initialEdges = [],
}: UseFlowOptions = {}) {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);

  const onNodesChange: OnNodesChange<FlowNode> = useCallback((changes) => {
    setNodes((snapshot) => applyNodeChanges(changes, snapshot));
  }, []);

  const onEdgesChange: OnEdgesChange<FlowEdge> = useCallback((changes) => {
    setEdges((snapshot) => applyEdgeChanges(changes, snapshot));
  }, []);

  const onConnect: OnConnect = useCallback((connection) => {
    setEdges((snapshot) => addEdge<FlowEdge>(connection, snapshot));
  }, []);

  /** 局部更新某个节点的 data（供 NodeForm 使用） */
  const updateNodeData = useCallback((id: string, patch: FlowNodeDataPatch) => {
    setNodes((snapshot) =>
      snapshot.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...patch } } : node,
      ),
    );
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeData,
  };
}

export type FlowController = ReturnType<typeof useFlow>;
