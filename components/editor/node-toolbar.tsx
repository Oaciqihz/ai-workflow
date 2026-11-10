"use client";

import { NodeToolbar, Position } from "@xyflow/react";

import { NodeForm } from "@/components/editor/forms/node-form";
import type {
  FlowNode,
  FlowNodeDataPatch,
  IncomingConnection,
} from "@/types/flow";
import { TextForm } from "./forms/text-form";

type SelectedNodeToolbarProps = {
  /** 当前唯一选中的节点，未选中时为 null */
  node: FlowNode | null;
  /** 指向该节点的连线（由画布层算好，节点对象本身不含连线信息） */
  incoming: IncomingConnection[];
  onUpdateData: (id: string, patch: FlowNodeDataPatch) => void;
};

/** 选中节点后贴在节点下方的属性浮层 */
export function SelectedNodeToolbar({
  node,
  incoming,
  onUpdateData,
}: SelectedNodeToolbarProps) {
  if (!node) return null;

  const RenderForm = ({ type }: { type: string | undefined }) => {
    switch (type) {
      case "text":
        return (
          <TextForm
            node={node}
            incoming={incoming}
            onChange={(patch) => onUpdateData(node.id, patch)}
          />
        );

      default:
        return (
          <NodeForm
            node={node}
            onChange={(patch) => onUpdateData(node.id, patch)}
          />
        );
    }
  };

  return (
    <NodeToolbar
      nodeId={node.id}
      isVisible
      position={Position.Bottom}
      offset={12}
      className="node-popover nodrag nopan nowheel"
    >
      <RenderForm type={node.type} />
    </NodeToolbar>
  );
}
