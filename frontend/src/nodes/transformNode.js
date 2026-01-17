import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customFunction, setCustomFunction] = useState(data?.customFunction || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setTransformType(newType);
    updateNodeField(id, 'transformType', newType);
  };

  const handleFunctionChange = (e) => {
    const newFunc = e.target.value;
    setCustomFunction(newFunc);
    updateNodeField(id, 'customFunction', newFunc);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      icon="🔄"
      color="#06B6D4"
      inputHandles={[
        { id: `${id}-input`, label: 'Data' }
      ]}
      outputHandles={[
        { id: `${id}-output`, label: 'Transformed' }
      ]}
      minWidth={240}
      minHeight={160}
    >
      <label>
        Transform Type:
        <select value={transformType} onChange={handleTypeChange}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="custom">Custom Function</option>
        </select>
      </label>
      {transformType === 'custom' && (
        <label>
          Custom Function:
          <input 
            type="text" 
            value={customFunction} 
            onChange={handleFunctionChange}
            placeholder="e.g., x => x * 2"
          />
        </label>
      )}
    </BaseNode>
  );
};
