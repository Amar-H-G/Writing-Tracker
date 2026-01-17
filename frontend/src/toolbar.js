// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-header">
                <h2>Pipeline Nodes</h2>
                <p>Drag nodes to the canvas to build your pipeline</p>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='condition' label='Condition' icon='🔀' />
                <DraggableNode type='transform' label='Transform' icon='🔄' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='merge' label='Merge' icon='🔗' />
                <DraggableNode type='split' label='Split' icon='✂️' />
            </div>
        </div>
    );
};
