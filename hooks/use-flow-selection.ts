"use client";

import { useCallback, useState } from "react";
import type { OnSelectionChangeParams } from "@xyflow/react";

/**
 * 画布选中态：只关心「是否唯一选中一个节点」，
 * 用于决定是否显示节点浮层。
 */
export function useFlowSelection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onSelectionChange = useCallback(({ nodes }: OnSelectionChangeParams) => {
    setSelectedId(nodes.length === 1 ? nodes[0].id : null);
  }, []);

  /** 点击空白画布时清空选中 */
  const clearSelection = useCallback(() => setSelectedId(null), []);

  return { selectedId, onSelectionChange, clearSelection };
}
