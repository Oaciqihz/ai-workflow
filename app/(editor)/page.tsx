"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  BackgroundVariant,
  NodeToolbar,
  Handle,
  Position,
  Controls,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 300 }, data: { label: "Node 3" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function EditorPage() {
  const { zoomIn, zoomOut, zoomTo, getZoom, fitView } = useReactFlow();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onSelectionChange = useCallback(({ nodes }: any) => {
    setSelectedId(nodes.length === 1 ? nodes[0].id : null);
  }, []);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  useEffect(() => {
    console.log();
  }, []);

  return (
    <>
      {selectedId}
      <div className="w-[80vw] h-[500px] border-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          onPaneClick={() => setSelectedId(null)}
          fitView
        >
          <Background
            color="#ccc"
            bgColor="#eef5f6"
            variant={BackgroundVariant.Dots}
          />

          {/* 自定义控制台 */}
          <Panel
            position="bottom-right"
            className="zoom-bar nopan border-[#dfe3e6] border p-[0_6px] bg-[#ebeff1] rounded-md flex"
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
              className="mx-1 bg-[#dfe3e6] !w-[2px] my-1.5"
            />
            <Button
              variant="ghost"
              className="px-1 text-[#696b71] font-mono text-[12px]"
              onClick={() => fitView({ padding: 0.2, duration: 300 })}
            >
              fit
            </Button>
          </Panel>

          {/* 弹出框 */}
          {selectedId && (
            <NodeToolbar
              nodeId={selectedId}
              isVisible
              position={Position.Bottom}
              offset={12}
              className="node-popover nodrag nopan nowheel"
            >
              {/* <NodeForm nodeId={selectedId} /> */}
              <div>hhh</div>
            </NodeToolbar>
          )}
        </ReactFlow>
      </div>
    </>
  );
}
