import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const SplitNode = ({ id, data }) => {
  const [splitDelimiter, setSplitDelimiter] = useState(data?.splitDelimiter || ',');
  const [maxSplits, setMaxSplits] = useState(data?.maxSplits || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDelimiterChange = (e) => {
    const newDelimiter = e.target.value;
    setSplitDelimiter(newDelimiter);
    updateNodeField(id, 'splitDelimiter', newDelimiter);
  };

  const handleMaxSplitsChange = (e) => {
    const newMax = e.target.value;
    setMaxSplits(newMax);
    updateNodeField(id, 'maxSplits', newMax);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      icon="✂️"
      color="#F97316"
      inputHandles={[
        { id: `${id}-input`, label: 'Input' }
      ]}
      outputHandles={[
        { id: `${id}-output1`, label: 'Part 1' },
        { id: `${id}-output2`, label: 'Part 2' },
        { id: `${id}-output3`, label: 'Part 3' }
      ]}
      minWidth={240}
      minHeight={160}
    >
      <label>
        Delimiter:
        <input 
          type="text" 
          value={splitDelimiter} 
          onChange={handleDelimiterChange}
          placeholder=","
        />
      </label>
      <label>
        Max Splits (optional):
        <input 
          type="number" 
          value={maxSplits} 
          onChange={handleMaxSplitsChange}
          placeholder="Leave empty for all"
          min="1"
        />
      </label>
    </BaseNode>
  );
};
