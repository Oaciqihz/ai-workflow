import type { Edge, Node } from "@xyflow/react";

/**
 * 节点业务数据。
 * 后续新增节点类型（llm / 条件分支 / 工具调用…）时，在此扩展字段，
 * 或用联合类型 + type 字段做区分。
 */
export type FlowNodeData = {
  label: string;
  description?: string;
  /** text 节点的正文。text-node.tsx 通过 updateNodeData 写入，这里补上声明 */
  text?: string;
};

/** 画布节点 */
export type FlowNode = Node<FlowNodeData>;

/** 画布连线 */
export type FlowEdge = Edge;

/** 节点数据补丁，供表单局部更新使用 */
export type FlowNodeDataPatch = Partial<FlowNodeData>;

/**
 * 一条指向某节点的入边，连同来源节点一起带上。
 * 表单需要的是「谁连过来了」，而不只是 edge 本身，
 * 所以在这里就把 sourceNode 解析好，避免各处重复 find。
 */
export type IncomingConnection = {
  edge: FlowEdge;
  sourceNode: FlowNode;
};
