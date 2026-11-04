import type { FlowEdge, FlowNode } from "@/types/flow";

/** 画布初始节点（后续改为从接口 / 路由参数加载） */
export const initialNodes: FlowNode[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 300 }, data: { label: "Node 3" } },
];

/** 画布初始连线 */
export const initialEdges: FlowEdge[] = [
  { id: "n1-n2", source: "n1", target: "n2" },
];
