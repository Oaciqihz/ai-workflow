import type { FlowEdge, FlowNode } from "@/types/flow";
import {
  SNAPSHOT_VERSION,
  type DslEdge,
  type DslNode,
  type WorkflowDSL,
  type WorkflowSnapshot,
} from "@/types/workflow";

/**
 * 画布 → 执行计划的唯一通道。
 *
 * 左边是 UI 状态（带坐标、选中态、尺寸），右边是引擎能读的计划（只有 id/kind/config）。
 * 任何要发给后端执行的东西都必须先过这里，别的地方不许自己拼 DslNode。
 */

/**
 * 画布节点 → DSL 节点。
 *
 * TODO 六类节点做完后，这里会变成一张 type → kind 的映射表：
 *   const KIND_BY_TYPE = { text: "input", llm: "llm", ... }
 * 现在画布只有 text 一种自定义节点，所以先用下面两条分支兜底。
 */
function toDslNode(node: FlowNode): DslNode {
  switch (node.type) {
    // 文本节点：产出一段固定文本，语义上属于 input
    case "text":
      return {
        id: node.id,
        kind: "input",
        config: { text: node.data.text ?? "" },
      };

    // n1 / n2 是 React Flow 默认节点，还没接自定义渲染。
    // 先按 input 处理，等你把画布换成六类节点后可以删掉这个分支。
    case undefined:
      return {
        id: node.id,
        kind: "input",
        config: { text: node.data.label },
      };

    default:
      // 宁可抛错也不要静默兜底：
      // 兜底会让「还没实现的节点」在图上跑出一个看起来正常的结果，最难查。
      throw new Error(`toDSL: 未注册的节点类型 "${node.type}"`);
  }
}

/** 画布连线 → DSL 连线，只保留拓扑信息 */
function toDslEdge(edge: FlowEdge): DslEdge {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
  };
}

/** 画布状态 → 执行计划（以后 /api/workflow/validate 和 run 的入参） */
export function toDSL(nodes: FlowNode[], edges: FlowEdge[]): WorkflowDSL {
  return {
    nodes: nodes.map(toDslNode),
    edges: edges.map(toDslEdge),
  };
}

/**
 * 画布状态 → 持久化载荷（存文件的形状）。
 * 存的是画布原样，所以刻意不过 toDSL —— 存档要能还原位置。
 */
export function toSnapshot(
  nodes: FlowNode[],
  edges: FlowEdge[],
): WorkflowSnapshot {
  return {
    version: SNAPSHOT_VERSION,
    updatedAt: new Date().toISOString(),
    graph: { nodes, edges },
  };
}
