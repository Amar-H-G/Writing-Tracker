import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      icon="🌐"
      color="#5CDBFF"
      inputHandles={[{ id: `${id}-payload`, label: 'Payload' }]}
      outputHandles={[{ id: `${id}-response`, label: 'Response' }]}
    >
      <label>
        URL:
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
      </label>
      <label>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};
