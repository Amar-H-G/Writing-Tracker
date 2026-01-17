import { BaseNode } from "../components/BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon="🤖"
      color="#F59E0B"
      inputHandles={[
        { id: `${id}-system`, label: "System", top: "30%" },
        { id: `${id}-prompt`, label: "Prompt", top: "70%" },
      ]}
      outputHandles={[{ id: `${id}-response`, label: "Response" }]}
      minWidth={220}
      minHeight={140}
    >
      <div style={{ fontSize: "13px", color: "#b0b0b0", lineHeight: "1.5" }}>
        Large Language Model node for processing text with AI capabilities.
      </div>
    </BaseNode>
  );
};
