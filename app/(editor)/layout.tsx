import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function EditorLayout({ children }: LayoutProps<"/">) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
