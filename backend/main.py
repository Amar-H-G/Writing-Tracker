from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline is a Directed Acyclic Graph (DAG) using topological sort.
    Returns True if DAG, False if contains cycles.
    """
    if not edges:
        return True
    
    # Build adjacency list
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {node.id for node in nodes}
    
    # Initialize in-degree for all nodes
    for node in nodes:
        in_degree[node.id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        source = edge.source
        target = edge.target
        
        if source in node_ids and target in node_ids:
            graph[source].append(target)
            in_degree[target] += 1
    
    # Topological sort using Kahn's algorithm
    queue = deque()
    
    # Add all nodes with in-degree 0 to queue
    for node_id in node_ids:
        if in_degree[node_id] == 0:
            queue.append(node_id)
    
    processed_count = 0
    
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree of neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    # If not, there's a cycle
    return processed_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong', 'message': 'Pipeline Parser API is running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    """
    Analyze pipeline structure:
    - Count nodes
    - Count edges
    - Check if it's a DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result
    }
