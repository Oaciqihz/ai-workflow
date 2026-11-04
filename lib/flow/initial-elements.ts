import type { FlowEdge, FlowNode } from "@/types/flow";

/** 画布初始节点（后续改为从接口 / 路由参数加载） */
export const initialNodes: FlowNode[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  // 自定义节点示例：type 需在 components/editor/nodes/index.ts 注册
  // style 里的宽高是缩放前的初始尺寸，拖拽四个角后由 xyflow 覆盖
  {
    id: "n3",
    type: "text",
    position: { x: 280, y: 220 },
    style: { width: 224, height: 96 },
    data: { label: "文本" },
  },
];

/** 画布初始连线 */
export const initialEdges: FlowEdge[] = [
  { id: "n1-n2", source: "n1", target: "n2" },
];
