/**
 * 执行计划（DSL）—— 前端画布和后端引擎之间唯一被允许交换的形状。
 *
 * 它和 types/flow.ts 里的 FlowNode 是两层东西，别混：
 *   FlowNode  带你 UI 才关心的 position / width / height / selected
 *   DslNode   只带引擎能理解的三样：id / kind / config
 *
 * 分层的意义：后端不需要、也不该看到节点的坐标。
 * 两者之间唯一的通道是 lib/flow/to-dsl.ts 里的 toDSL()。
 */

import type { FlowEdge, FlowNode } from "@/types/flow";

/**
 * 节点的执行语义。
 * 注意：画布上的 node.type 是 React Flow 的渲染键，和 kind 不是一一对应，
 * 映射关系由 toDSL() 维护。
 */
export type NodeKind =
  | "input"
  | "llm"
  | "image"
  | "condition"
  | "transform"
  | "http"
  | "output";

/**
 * 文生图节点的配置。
 *
 * 它是「节点语义」而不是「某个厂商的接口参数」：
 * model 先留成 string，等接了真实 provider 再用联合字面量收窄，
 * 否则每换一家的模型列表就要改一次契约。
 */
export type ImageAspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";
export type ImageResolution = "1K" | "2K" | "4K";

export type ImageConfig = {
  /** 提示词：这套配置里唯一必填的语义输入 */
  prompt: string;
  /** 模型标识，由表单的选项提供，契约不锁具体厂商 */
  model: string;
  aspectRatio: ImageAspectRatio;
  resolution: ImageResolution;
  /** 一次生成几张，先限制在 1~4 */
  count: number;
};

/**
 * 每种 kind 各自的配置。
 * 现在只写最小必要字段，做到那一类节点时再补——
 * 补字段只会让「构造 config 的地方」报错，不会波及引擎。
 */
export type NodeConfigMap = {
  input: { text: string };
  llm: { model: string; prompt: string };
  image: ImageConfig;
  condition: { expression: string };
  transform: { script: string };
  http: { url: string; method: "GET" | "POST" };
  output: { format: "text" | "json" };
};

/**
 * 画布上「文生图」节点的 data。
 *
 * 放在这里而不是 types/flow.ts：它直接由契约字段拼出来，
 * 而 flow.ts 已经被本文件引用，反向引用会形成类型循环。
 * 表单只需要在这个形状上做局部更新（Partial<ImageConfig>）。
 */
export type ImageNodeData = ImageConfig & {
  /** 节点标题，纯 UI，不进 DSL */
  label: string;
};

/**
 * 判别联合：kind 就是区分符。
 *
 * 好处是 switch (node.kind) 之后，node.config 会自动窄化成对应的形状，
 * 全程不需要 as 断言。这是这份契约里最值钱的一段——
 * 少了它，config 只能写成 Record<string, unknown>，等于没类型。
 */
export type DslNode = {
  [K in NodeKind]: {
    id: string;
    kind: K;
    config: NodeConfigMap[K];
  };
}[NodeKind];

/**
 * 连线只保留拓扑，同样不带 UI 字段（颜色、动画、selected）。
 * sourceHandle / targetHandle 要留着：一个节点有多个输出口时，
 * 「这条边从哪个口出」是执行语义，不是样式。
 */
export type DslEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

/** 一张图的执行计划。引擎（拓扑排序 / 调度）的入参就是它 */
export type WorkflowDSL = {
  nodes: DslNode[];
  edges: DslEdge[];
};

/**
 * 存储格式版本号。
 * 以后 DslNode / Snapshot 的结构变了就 +1，用它在读取时识别旧文件。
 * 现在没有任何历史数据，但只要这个字段在，你就永远有回头路。
 */
export const SNAPSHOT_VERSION = 1;

/**
 * 持久化载荷 —— 注意它存的是「画布快照」，不是执行计划。
 *
 * graph 里的节点带 position，因为重新打开时要还原位置，这是对的需求。
 * 但引擎永远只吃 WorkflowDSL，中间必须过 toDSL()。
 * 换句话说：这个类型的职责是「存档」，不是「契约」。
 */
export type WorkflowSnapshot = {
  version: typeof SNAPSHOT_VERSION;
  updatedAt: string;
  graph: {
    nodes: FlowNode[];
    edges: FlowEdge[];
  };
};
