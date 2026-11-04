"use client";

import { NodeToolbar, Position } from "@xyflow/react";

import { NodeForm } from "@/components/editor/forms/node-form";
import type { FlowNode, FlowNodeDataPatch } from "@/types/flow";

type SelectedNodeToolbarProps = {
  /** 当前唯一选中的节点，未选中时为 null */
  node: FlowNode | null;
  onUpdateData: (id: string, patch: FlowNodeDataPatch) => void;
};

/** 选中节点后贴在节点下方的属性浮层 */
export function SelectedNodeToolbar({
  node,
  onUpdateData,
}: SelectedNodeToolbarProps) {
  if (!node) return null;

  return (
    <NodeToolbar
      nodeId={node.id}
      isVisible
      position={Position.Bottom}
      offset={12}
      className="node-popover nodrag nopan nowheel"
    >
      <NodeForm
        node={node}
        onChange={(patch) => onUpdateData(node.id, patch)}
      />
    </NodeToolbar>
  );
}
