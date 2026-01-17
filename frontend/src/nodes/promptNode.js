import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const PromptNode = ({ id, data }) => {
  const [prompt, setPrompt] = useState(data?.prompt || '');
  const [model, setModel] = useState(data?.model || 'gpt-3.5-turbo');

  return (
    <BaseNode
      id={id}
      data={data}
      title="AI Prompt"
      icon="🤖"
      color="#FF5CBC"
      inputHandles={[{ id: `${id}-input`, label: 'Context' }]}
      outputHandles={[{ id: `${id}-output`, label: 'Response' }]}
    >
      <label>
        Prompt:
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Translate text to..."
          rows={2}
          style={{ resize: 'none' }}
        />
      </label>
      <label>
        Model:
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-2">Claude 2</option>
        </select>
      </label>
    </BaseNode>
  );
};
