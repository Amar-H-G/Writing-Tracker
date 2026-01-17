import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const FilterNode = ({ id, data }) => {
  const [filterCriteria, setFilterCriteria] = useState(
    data?.filterCriteria || ""
  );
  const [filterType, setFilterType] = useState(data?.filterType || "contains");
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleCriteriaChange = (e) => {
    const newCriteria = e.target.value;
    setFilterCriteria(newCriteria);
    updateNodeField(id, "filterCriteria", newCriteria);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFilterType(newType);
    updateNodeField(id, "filterType", newType);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      icon="🔍"
      color="#EC4899"
      inputHandles={[{ id: `${id}-input`, label: "Data" }]}
      outputHandles={[{ id: `${id}-output`, label: "Filtered" }]}
      minWidth={240}
      minHeight={160}
    >
      <label>
        Filter Type:
        <select value={filterType} onChange={handleTypeChange}>
          <option value="contains">Contains</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="equals">Equals</option>
          <option value="regex">Regex Match</option>
        </select>
      </label>
      <label>
        Filter Criteria:
        <input
          type="text"
          value={filterCriteria}
          onChange={handleCriteriaChange}
          placeholder="Enter filter value"
        />
      </label>
    </BaseNode>
  );
};
