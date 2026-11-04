"use client";

import { useEffect, useRef, useState } from "react";
import {
  Handle,
  NodeResizeControl,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { cn } from "cn";

export type TextNodeData = {
  label: string;
  text?: string;
};

export type TextNode = Node<TextNodeData, "text">;

/** 四个可拖拽缩放的角（xyflow 的 ControlPosition 字面量） */
const RESIZE_CORNERS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export function TextNode({ id, data, selected }: NodeProps<TextNode>) {
  const { updateNodeData } = useReactFlow();

  /** 平时只展示文本，双击才切成输入框 */
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) {
      return;
    }

    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    // 先 focus 再把光标推到末尾：只 focus 的话浏览器默认把光标放在开头（selectionStart = 0）
    textarea.focus();
    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
  }, [editing]);

  return (
    <div
      className={cn(
        "group flex h-full min-h-20 w-full min-w-56 flex-col rounded-lg border bg-white p-2 shadow-[0_0_4px] shadow-gray-300 transition-all",
        selected
          ? "border-[#3b82f6] shadow-[#3b82f680]"
          : "border-[#dfe3e6] hover:border-[#3b82f6] hover:shadow-[#3b82f680]",
      )}
    >
      {/* 四角缩放：尺寸由 xyflow 写回 node.width/height，组件内不用自己存 state，
          所以内层用 h-full / w-full 跟随外层 wrapper 即可。 */}
      {RESIZE_CORNERS.map((position) => (
        <NodeResizeControl
          key={position}
          className="opacity-0"
          position={position}
          minWidth={224}
          minHeight={80}
        />
      ))}

      <Handle
        className={cn("group-hover:opacity-100", selected ? "" : "opacity-0")}
        type="target"
        position={Position.Left}
      />

      {editing ? (
        <textarea
          ref={textareaRef}
          className="nodrag nowheel min-h-0 w-full flex-1 resize-none bg-transparent font-mono text-[12px] outline-none"
          placeholder="输入文本…"
          value={data.text ?? ""}
          onChange={(event) => updateNodeData(id, { text: event.target.value })}
          onBlur={() => setEditing(false)}
          onDoubleClick={(event) => event.stopPropagation()}
        />
      ) : (
        <div
          className="nowheel min-h-0 w-full flex-1 overflow-auto font-mono text-[12px] break-words whitespace-pre-wrap"
          onDoubleClick={(event) => {
            // 不阻止冒泡的话，画布的 zoomOnDoubleClick 会跟着把视图放大
            event.stopPropagation();
            setEditing(true);
          }}
        >
          {data.text ? (
            data.text
          ) : (
            <span className="text-[#9aa4ac]">双击编辑文字</span>
          )}
        </div>
      )}

      <Handle
        className={cn("group-hover:opacity-100", selected ? "" : "opacity-0")}
        type="source"
        position={Position.Right}
      />
    </div>
  );
}
