import { useState, useEffect, useRef } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 240, height: 160 });
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables: {{varName}}
  useEffect(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map((m) => m[1]))];
    setVariables(uniqueVars);
    updateNodeField(id, "text", currText);
  }, [currText, id, updateNodeField]);

  // Handle auto-resize using a measurement div
  useEffect(() => {
    // Create a measurement div if it doesn't exist
    let measureDiv = document.getElementById('text-node-measure-div');
    if (!measureDiv) {
      measureDiv = document.createElement('div');
      measureDiv.id = 'text-node-measure-div';
      measureDiv.style.position = 'absolute';
      measureDiv.style.visibility = 'hidden';
      measureDiv.style.top = '-9999px';
      measureDiv.style.left = '-9999px';
      measureDiv.style.pointerEvents = 'none';
      measureDiv.style.whiteSpace = 'pre-wrap';
      measureDiv.style.wordBreak = 'break-word';
      // Match textarea styles EXACTLY
      measureDiv.style.fontSize = '14px';
      measureDiv.style.fontFamily = 'Inter, -apple-system, sans-serif';
      measureDiv.style.lineHeight = '1.5';
      measureDiv.style.padding = '12px 14px';
      document.body.appendChild(measureDiv);
    }

    // Step 1: Measure Max Width
    measureDiv.style.width = 'auto';
    measureDiv.style.whiteSpace = 'nowrap';
    measureDiv.textContent = currText || " ";
    const naturalWidth = measureDiv.scrollWidth;

    const MIN_WIDTH = 240;
    const MAX_WIDTH = 450;
    const horizontalExtra = 64; // BaseNode padding + scroll/padding buffer
    
    // Calculated Target Width
    const targetWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, naturalWidth + horizontalExtra));

    // Step 2: Measure Height at Target Width
    measureDiv.style.whiteSpace = 'pre-wrap';
    measureDiv.style.width = `${targetWidth - horizontalExtra}px`;
    const naturalHeight = measureDiv.scrollHeight;

    // Node Height: Header + Padding + Content
    const targetHeight = Math.max(160, naturalHeight + 110);

    setDimensions({ width: targetWidth, height: targetHeight });
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      icon="📝"
      color="#8B5CF6"
      minWidth={dimensions.width}
      minHeight={dimensions.height}
      inputHandles={variables.map((v) => ({
        id: `${id}-${v}`,
        label: v,
      }))}
      outputHandles={[{ id: `${id}-output`, label: "Output" }]}
      className="text-node-wrapper"
    >
      <div className="text-node-input-container" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        minHeight: 0 
      }}>
        <label style={{ marginBottom: '8px' }}>TEXT:</label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="text-node-textarea"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            resize: 'none',
            margin: 0,
            overflow: 'hidden'
          }}
          placeholder="Type {{variable}}..."
        />
      </div>
    </BaseNode>
  );
};
