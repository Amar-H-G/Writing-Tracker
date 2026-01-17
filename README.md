# Writing Tracker: Node-Based Pipeline Builder 🚀

Writing Tracker is a powerful, interactive workflow builder that allows you to design and validate complex processing pipelines using a draggable node-based interface. Built with a modern tech stack (FastAPI + React), it provides a seamless experience for creating Directed Acyclic Graphs (DAGs) for various automation and processing tasks.

---

## ✨ Features

- **Interactive Canvas**: Drag-and-drop nodes to create unique, complex workflows with ease.
- **Diverse Node Types**: Over 15 specialized nodes to handle various tasks:
  - **Core Nodes**: `Input`, `Output`, `Text` (with dynamic variable support).
  - **Logic Nodes**: `Condition`, `Filter`, `Split`, `Merge`.
  - **Processing Nodes**: `LLM`, `Prompt`, `Transform`, `Delay`.
  - **Integration Nodes**: `API`, `Database`, `Note`.
- **Dynamic Text Recognition**: The `TextNode` automatically recognizes variables within double curly braces `{{var}}` and adds corresponding input handles.
- **DAG Validation**: Integrated backend analysis using Kahn's Algorithm to ensure your pipeline is a valid Directed Acyclic Graph (DAG) with no circular dependencies.
- **Premium UI/UX**: A dark-themed, sleek interface with smooth animations and real-time state updates.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | React.js, React Flow, Zustand (State Management) |
| **Backend** | Python, FastAPI, Pydantic |
| **Styling** | Vanilla CSS (Custom Glassmorphism and Modern Dark Theme) |
| **Algorithms** | Topological Sort (Kahn's Algorithm) for DAG validation |

---

## 🏗️ Project Structure

```text
Writing-Tracker/
├── backend/                # Python FastAPI Backend
│   ├── main.py             # Pipeline parsing logic & API endpoints
│   └── requirements.txt    # Backend dependencies
├── frontend/               # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── nodes/          # Implementation of all 15+ custom node types
│   │   ├── components/     # High-level UI components
│   │   ├── store.js        # Global state management (Zustand)
│   │   ├── ui.js           # Main React Flow canvas setup
│   │   ├── submit.js       # Pipeline submission and analysis modal
│   │   └── index.js        # Application entry point
│   └── package.json        # Frontend dependencies & scripts
└── README.md               # Project documentation
```

---

## 🔄 Working Flow

1. **Design**: Drag nodes from the toolbar (top of the screen) onto the main canvas.
2. **Connect**: Link node outputs to inputs to establish the flow of data.
3. **Configure**: Customize node fields. For example, use `{{variable_name}}` in a Text Node to create dynamic inputs.
4. **Analyze**: Click the **"Submit Pipeline"** button to send your configuration to the backend server.
5. **Validate**: The system instantly returns the node/edge count and verifies if the structure is a valid, loop-free DAG.

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*The backend will be running at `http://localhost:8000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
*The frontend will be running at `http://localhost:3000`*

---

## 💡 Usage Tips
- Double-click nodes to edit their properties.
- Use the **MiniMap** in the bottom right corner for easier navigation of large pipelines.
- Ensure the backend is running before clicking "Submit" to see the DAG validation in action.

---
*Built with ❤️ for complex workflow enthusiasts.*

