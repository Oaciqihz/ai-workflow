import type { NodeTypes } from "@xyflow/react";

import { TextNode } from "./text-node";

/** 节点类型注册表：ReactFlow 依据 node.type 找对应的渲染组件 */
export const nodeTypes: NodeTypes = {
  text: TextNode,
};

export { TextNode } from "./text-node";
export type { TextNodeData } from "./text-node";
