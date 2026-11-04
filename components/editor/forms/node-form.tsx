"use client";

import type { FlowNode, FlowNodeDataPatch } from "@/types/flow";

type NodeFormProps = {
  node: FlowNode;
  onChange: (patch: FlowNodeDataPatch) => void;
};

/**
 * 节点属性表单（占位实现）。
 * 后续按节点类型拆成多个表单时，这里做分发：
 * switch (node.type) { case "llm": return <LlmNodeForm ... /> ... }
 */
export function NodeForm({ node, onChange }: NodeFormProps) {
  return (
    <div className="bg-popover text-popover-foreground w-56 space-y-2 rounded-lg border p-3 shadow-md">
      <label className="block space-y-1">
        <span className="text-muted-foreground text-xs">节点名称</span>
        <input
          className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/40 h-8 w-full rounded-md border px-2 text-sm outline-none focus-visible:ring-2"
          value={node.data.label}
          onChange={(event) => onChange({ label: event.target.value })}
        />
      </label>
      <p className="text-muted-foreground font-mono text-[11px]">
        id: {node.id}
      </p>
    </div>
  );
}
