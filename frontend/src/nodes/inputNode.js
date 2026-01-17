import { useState, useEffect } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, "inputName", newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    updateNodeField(id, "inputType", newType);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon="📥"
      color="#5C7DFF"
      outputHandles={[{ id: `${id}-value`, label: "Value" }]}
      minWidth={220}
      minHeight={120}
    >
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          placeholder="Enter input name"
        />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Number">Number</option>
          <option value="Boolean">Boolean</option>
        </select>
      </label>
    </BaseNode>
  );
};
