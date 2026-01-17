import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleStrategyChange = (e) => {
    const newStrategy = e.target.value;
    setMergeStrategy(newStrategy);
    updateNodeField(id, 'mergeStrategy', newStrategy);
  };

  const handleSeparatorChange = (e) => {
    const newSep = e.target.value;
    setSeparator(newSep);
    updateNodeField(id, 'separator', newSep);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      icon="🔗"
      color="#14B8A6"
      inputHandles={[
        { id: `${id}-input1`, label: 'Input 1' },
        { id: `${id}-input2`, label: 'Input 2' },
        { id: `${id}-input3`, label: 'Input 3' }
      ]}
      outputHandles={[
        { id: `${id}-output`, label: 'Merged' }
      ]}
      minWidth={240}
      minHeight={160}
    >
      <label>
        Merge Strategy:
        <select value={mergeStrategy} onChange={handleStrategyChange}>
          <option value="concat">Concatenate</option>
          <option value="join">Join with Separator</option>
          <option value="merge">Merge Objects</option>
          <option value="union">Union Arrays</option>
        </select>
      </label>
      {mergeStrategy === 'join' && (
        <label>
          Separator:
          <input 
            type="text" 
            value={separator} 
            onChange={handleSeparatorChange}
            placeholder=", "
          />
        </label>
      )}
    </BaseNode>
  );
};
