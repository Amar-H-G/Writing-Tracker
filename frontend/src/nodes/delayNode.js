import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      icon="⏳"
      color="#FF8E5C"
      inputHandles={[{ id: `${id}-input`, label: 'Input' }]}
      outputHandles={[{ id: `${id}-output`, label: 'Delayed' }]}
    >
      <label>
        Delay (ms):
        <input 
          type="number" 
          value={delay} 
          onChange={(e) => setDelay(e.target.value)} 
          min="0"
          step="100"
        />
      </label>
      <div style={{ fontSize: '10px', color: '#8a8aa3', marginTop: '4px' }}>
        Pauses the pipeline execution.
      </div>
    </BaseNode>
  );
};
