import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleConditionChange = (e) => {
    const newCondition = e.target.value;
    setCondition(newCondition);
    updateNodeField(id, "condition", newCondition);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      icon="🔀"
      color="#EF4444"
      inputHandles={[{ id: `${id}-input`, label: "Input" }]}
      outputHandles={[
        { id: `${id}-true`, label: "True" },
        { id: `${id}-false`, label: "False" },
      ]}
      minWidth={240}
      minHeight={140}
    >
      <label>
        Condition Expression:
        <input
          type="text"
          value={condition}
          onChange={handleConditionChange}
          placeholder="e.g., value > 10"
        />
      </label>
      <div style={{ fontSize: "12px", color: "#b0b0b0", marginTop: "4px" }}>
        Evaluates condition and routes to True/False outputs
      </div>
    </BaseNode>
  );
};
