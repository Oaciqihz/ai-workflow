import type { Edge, Node } from "@xyflow/react";

/**
 * 节点业务数据。
 * 后续新增节点类型（llm / 条件分支 / 工具调用…）时，在此扩展字段，
 * 或用联合类型 + type 字段做区分。
 */
export type FlowNodeData = {
  label: string;
  description?: string;
};

/** 画布节点 */
export type FlowNode = Node<FlowNodeData>;

/** 画布连线 */
export type FlowEdge = Edge;

/** 节点数据补丁，供表单局部更新使用 */
export type FlowNodeDataPatch = Partial<FlowNodeData>;
