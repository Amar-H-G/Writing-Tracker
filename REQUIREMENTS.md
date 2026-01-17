# Writing Tracker - Detailed Project Documentation

## 🚀 Overview
**Writing Tracker** is a state-of-the-art **Pipeline Editor** designed for creating and analyzing complex logic flows. It combines a high-performance visual interface with a robust backend for structural analysis and cycle detection (DAG validation).

---

## 🛠 Tools & Technologies Used

### Frontend (User Interface)
- **React.js**: The core framework for building a dynamic and responsive UI.
- **React Flow**: The primary library used to render the node-based canvas, handles, and edges.
- **Zustand**: A lightweight state management library used to manage the pipeline's global state (nodes, edges, and field updates).
- **Vanilla CSS**: Used for custom, high-end styling (Glassmorphism, animations, and transitions).

### Backend (Logic & Analysis)
- **FastAPI**: A high-performance Python framework for building the API endpoints.
- **Pydantic**: Used for data validation and type hinting to ensure data integrity between frontend and backend.
- **Python Collections**: Utilized `defaultdict` and `deque` for implementing Kahn's Algorithm.

---

## 📂 Folder & File Explanation

### Root Directory
- `REQUIREMENTS.md`: This comprehensive project documentation.
- `README.md`: Basic project setup and run instructions.

### 💻 Frontend (`/frontend`)
- **`src/ui.js`**: The main entry point for the Pipeline Canvas. It integrates React Flow and registers all custom node types.
- **`src/store.js`**: The "brain" of the frontend. It keeps track of every node and edge on the canvas.
- **`src/submit.js`**: Manages the logic for sending data to the backend and displaying the **Analysis Results Modal**.
- **`src/components/BaseNode.jsx`**: A reusable wrapper that provides the consistent "Glass" look and handle logic for all nodes.
- **`src/nodes/`**: Contains individual logic for specialized nodes:
    - `textNode.js`: Features advanced auto-resize and variable detection logic.
    - `promptNode.js`, `dbNode.js`, etc.: Specialized nodes for specific workflow tasks.

### ⚙️ Backend (`/backend`)
- **`main.py`**: Contains the FastAPI application and the logic for the `/pipelines/parse` endpoint.
- **`requirements.txt`**: Lists the necessary Python packages.

---

## 🔄 System Workflow

1. **Node Placement**: User drags a node from the toolbar onto the canvas.
2. **Interaction**: User types in a node (e.g., `{{var}}` in a Text Node). The `textNode.js` logic detects variables and creates handles, while also resizing the block in real-time.
3. **Data Sync**: Every change is synced to the Zustand `store.js`.
4. **Linking**: User connects nodes using edges.
5. **Analysis**: Upon clicking **Submit**, the frontend sends the JSON representation of nodes and edges to the FastAPI `/pipelines/parse` endpoint.
6. **Validation**: The backend parses the structure, counts items, and runs a cycle detection algorithm.
7. **Feedback**: The result is sent back to the frontend and displayed in a premium modal.

---

## 📸 Visual Documentation

### Main Pipeline Canvas
![Full Pipeline Interface](file:///C:/Users/User/.gemini/antigravity/brain/e9bfe9e6-7811-4859-a216-ab05596a9991/uploaded_image_0_1768625353176.png)

### Real-time Text Node Scaling
![Dynamic Text Node](file:///C:/Users/User/.gemini/antigravity/brain/e9bfe9e6-7811-4859-a216-ab05596a9991/uploaded_image_1768625057918.png)

### Structural Analysis Result
![Analysis Modal](file:///C:/Users/User/.gemini/antigravity/brain/e9bfe9e6-7811-4859-a216-ab05596a9991/uploaded_image_1_1768625353176.png)

---

## ✅ Feature Checklist Analysis
- [x] **Premium UI**: Glassmorphism and smooth animations integrated.
- [x] **Smart Text Node**: Bidirectional auto-resize and variable detection functional.
- [x] **Extensibility**: 5+ custom node types registered and ready.
- [x] **DAG Integration**: Backend correctly identifies circular dependencies.
- [x] **User Feedback**: Professional Modal UI for analysis results.
