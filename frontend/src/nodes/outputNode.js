import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, "outputName", newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setOutputType(newType);
    updateNodeField(id, "outputType", newType);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon="📤"
      color="#10B981"
      inputHandles={[{ id: `${id}-value`, label: "Value" }]}
      minWidth={220}
      minHeight={120}
    >
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          placeholder="Enter output name"
        />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
        </select>
      </label>
    </BaseNode>
  );
};
