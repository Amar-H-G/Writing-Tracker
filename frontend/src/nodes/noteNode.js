import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const NoteNode = ({ id, data }) => {
  const [message, setMessage] = useState(data?.message || '');
  const [level, setLevel] = useState(data?.level || 'info');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Notification"
      icon="🔔"
      color="#FFD15C"
      inputHandles={[{ id: `${id}-trigger`, label: 'Trigger' }]}
      outputHandles={[{ id: `${id}-sent`, label: 'Status' }]}
    >
      <label>
        Message:
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Alert message"
        />
      </label>
      <label>
        Level:
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </label>
    </BaseNode>
  );
};
