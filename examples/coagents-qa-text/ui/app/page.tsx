"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { Greeter } from "./Greeter";
import "@copilotkit/react-ui/styles.css";
import {
  ModelSelectorProvider,
  useModelSelectorContext,
} from "@/lib/model-selector-provider";
import { ModelSelector } from "@/components/ModelSelector";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ModelSelectorWrapper() {
  return (
    <main className="flex flex-col items-center justify-between">
      <ModelSelectorProvider>
        <Suspense>
          <Home />
        </Suspense>
        <ModelSelector />
      </ModelSelectorProvider>
    </main>
  );
}

function Home() {
  const { lgcDeploymentUrl, agent } = useModelSelectorContext();

  const searchParams = useSearchParams();

  const runtimeUrl = searchParams.get("runtimeUrl")
    ? (searchParams.get("runtimeUrl") as string)
    : `/api/copilotkit?lgcDeploymentUrl=${lgcDeploymentUrl ?? ""}`;

  const publicApiKey = searchParams.get("publicApiKey");
  const copilotKitProps: Partial<React.ComponentProps<typeof CopilotKit>> = {
    runtimeUrl,
    publicApiKey: publicApiKey || undefined,
    showDevConsole: false,
    agent,
  };
  return (
    <CopilotKit {...copilotKitProps}>
      <Greeter />
    </CopilotKit>
  );
}
