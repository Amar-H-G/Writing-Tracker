// submit.js

import { useState } from 'react';
import { useStore } from './store';
import './submit.css';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            alert('Please add at least one node to the pipeline');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setAlertData(data);
            setShowAlert(true);
            
            // Auto-hide alert after 5 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Make sure the backend server is running on http://localhost:8000');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="submit-container">
                <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Submit Pipeline'}
                </button>
            </div>

            {showAlert && alertData && (
                <div className="alert-overlay" onClick={() => setShowAlert(false)}>
                    <div className="alert-box" onClick={(e) => e.stopPropagation()}>
                        <div className="alert-header">
                            <h3>Pipeline Analysis Results</h3>
                            <button 
                                className="alert-close"
                                onClick={() => setShowAlert(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="alert-content">
                            <div className="alert-summary">
                                <p>We've analyzed your pipeline and here's what we found:</p>
                            </div>
                            <div className="alert-stats">
                                <div className="alert-stat-card">
                                    <span className="stat-value">{alertData.num_nodes}</span>
                                    <span className="stat-label">Total Nodes</span>
                                </div>
                                <div className="alert-stat-card">
                                    <span className="stat-value">{alertData.num_edges}</span>
                                    <span className="stat-label">Total Edges</span>
                                </div>
                            </div>
                            <div className={`alert-dag-status ${alertData.is_dag ? 'status-valid' : 'status-invalid'}`}>
                                <div className="status-icon">
                                    {alertData.is_dag ? '✅' : '❌'}
                                </div>
                                <div className="status-info">
                                    <strong>DAG Status: {alertData.is_dag ? 'Valid' : 'Invalid'}</strong>
                                    <p>
                                        {alertData.is_dag 
                                            ? 'Great! Your pipeline is a Directed Acyclic Graph, meaning it has no circular dependencies.' 
                                            : 'Heads up! We detected cycles in your pipeline. Make sure there are no circular loops between nodes.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
