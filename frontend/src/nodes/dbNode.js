import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || '');
  const [table, setTable] = useState(data?.table || 'users');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      icon="💾"
      color="#5CFF9D"
      inputHandles={[{ id: `${id}-params`, label: 'Params' }]}
      outputHandles={[{ id: `${id}-data`, label: 'Result' }]}
    >
      <label>
        Table:
        <input 
          type="text" 
          value={table} 
          onChange={(e) => setTable(e.target.value)} 
        />
      </label>
      <label>
        Query:
        <textarea 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="SELECT * FROM..."
          rows={2}
          style={{ resize: 'none' }}
        />
      </label>
    </BaseNode>
  );
};
