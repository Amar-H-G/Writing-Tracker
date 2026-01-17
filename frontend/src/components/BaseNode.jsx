import React from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

/**
 * BaseNode - Reusable node component abstraction
 * 
 * @param {string} id - Node ID
 * @param {object} data - Node data
 * @param {string} title - Node title
 * @param {string} icon - Optional icon/emoji
 * @param {string} color - Node accent color (default: primary)
 * @param {array} inputHandles - Array of {id, label, position} for input handles
 * @param {array} outputHandles - Array of {id, label, position} for output handles
 * @param {ReactNode} children - Node content
 * @param {number} minWidth - Minimum width
 * @param {number} minHeight - Minimum height
 * @param {function} onUpdate - Callback when node data updates
 */
export const BaseNode = ({
  id,
  data,
  title = 'Node',
  icon = null,
  color = 'primary',
  inputHandles = [],
  outputHandles = [],
  children,
  minWidth = 200,
  minHeight = 100,
  className = '',
}) => {
  const nodeColor = color === 'primary' ? '#5C7DFF' : color;

  return (
    <div 
      className={`base-node ${className}`}
      style={{
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        '--node-color': nodeColor,
      }}
    >
      {/* Input Handles */}
      <div className="handles-container input-handles">
        {inputHandles.map((handle, index) => {
          const handleId = handle.id || `${id}-input-${index}`;
          const top = handle.top || `${((index + 1) * 100) / (inputHandles.length + 1)}%`;
          
          return (
            <Handle
              key={handleId}
              type="target"
              position={handle.position || Position.Left}
              id={handleId}
              style={{
                top: top,
                background: nodeColor,
                border: `2px solid ${nodeColor}`,
              }}
              className="custom-handle"
            >
              {handle.label && (
                <div className="handle-label handle-label-left">
                  {handle.label}
                </div>
              )}
            </Handle>
          );
        })}
      </div>

      {/* Node Header */}
      <div className="base-node-header">
        <div className="header-icon-container" style={{ background: `${nodeColor}15` }}>
          {icon && <span className="base-node-icon">{icon}</span>}
        </div>
        <div className="header-text-container">
          <span className="base-node-title">{title}</span>
          <span className="base-node-id">{id.split('-')[0]}</span>
        </div>
      </div>

      {/* Node Content */}
      <div className="base-node-content">
        {children}
      </div>

      {/* Output Handles */}
      <div className="handles-container output-handles">
        {outputHandles.map((handle, index) => {
          const handleId = handle.id || `${id}-output-${index}`;
          const top = handle.top || `${((index + 1) * 100) / (outputHandles.length + 1)}%`;

          return (
            <Handle
              key={handleId}
              type="source"
              position={handle.position || Position.Right}
              id={handleId}
              style={{
                top: top,
                background: nodeColor,
                border: `2px solid ${nodeColor}`,
              }}
              className="custom-handle"
            >
              {handle.label && (
                <div className="handle-label handle-label-right">
                  {handle.label}
                </div>
              )}
            </Handle>
          );
        })}
      </div>
    </div>
  );
};
