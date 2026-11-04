"use client";

import { Panel, useReactFlow } from "@xyflow/react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/** 画布右上角的缩放控制条 */
export function ZoomPanel() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel
      position="top-right"
      className="zoom-bar nopan flex items-center rounded-md border border-[#dfe3e6] bg-[#ebeff1] px-1.5"
    >
      <Button
        variant="ghost"
        className="px-1 text-[#696b71]"
        onClick={() => zoomIn({ duration: 200 })}
      >
        <Plus />
      </Button>
      <Button
        variant="ghost"
        className="px-1 text-[#696b71]"
        onClick={() => zoomOut({ duration: 200 })}
      >
        <Minus />
      </Button>
      <Separator
        orientation="vertical"
        className="mx-1 my-1.5 w-[2px]! bg-[#dfe3e6]"
      />
      <Button
        variant="ghost"
        className="px-1 font-mono text-[12px] text-[#696b71]"
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
      >
        fit
      </Button>
    </Panel>
  );
}
