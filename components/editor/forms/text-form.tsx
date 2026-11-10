"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  FlowNode,
  FlowNodeDataPatch,
  IncomingConnection,
} from "@/types/flow";
import ImgSetting from "../render/img";

type NodeFormProps = {
  node: FlowNode;
  /** 连到当前节点的上游节点（画布层算好后传进来） */
  incoming: IncomingConnection[];
  onChange: (patch: FlowNodeDataPatch) => void;
};

/**
 * 节点属性表单（占位实现）。
 * 后续按节点类型拆成多个表单时，这里做分发：
 * switch (node.type) { case "llm": return <LlmNodeForm ... /> ... }
 */
export function TextForm({ node, incoming, onChange }: NodeFormProps) {
  return (
    <div className="bg-popover text-popover-foreground w-[350px] space-y-2 rounded-lg border p-3 shadow-md">
      <Tabs defaultValue="img">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-bold">生成配置</p>
          <TabsList>
            <TabsTrigger className="cursor-pointer px-2" value="img">
              生图
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-2" value="text">
              文本
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-2" value="video">
              视频
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-2" value="audio">
              音频
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 上游连接：先只做「有几个、分别是哪张卡」，分类到提示词/参考图时再接 handle id */}
        <div className="text-muted-foreground space-y-1 text-[11px]">
          {incoming.length === 0 ? (
            <p>未连接上游节点</p>
          ) : (
            <ul className="space-y-1">
              {incoming.map(({ edge, sourceNode }) => (
                <li key={edge.id} className="flex items-center gap-1">
                  <span className="bg-muted rounded px-1 py-0.5">
                    {sourceNode.data.label}
                  </span>
                  <span className="truncate font-mono">{sourceNode.id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <TabsContent value="img">
          <ImgSetting />
        </TabsContent>
        <TabsContent value="text"></TabsContent>
        <TabsContent value="video"></TabsContent>
        <TabsContent value="audio"></TabsContent>
      </Tabs>
    </div>
  );
}
