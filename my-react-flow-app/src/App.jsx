import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel
} from 'reactflow';
import axios from 'axios';


import InputNode from './InputNode.jsx';


import './text-updater-node.css';
import 'reactflow/dist/style.css';




const flowKey = 'example-flow';


const initialNodes = [
  { id: '0', position: { x: 100, y: -100 }, data: { label: 'QR' } },
  { id: '1', position: { x: 100, y: 0 }, data: { label: '/консультация' } },
  {
    id: '2', position: { x: 100, y: 100 }, data: {
      label: 'Здравствуйте. Ваша заявка на консультацию принята.' +
        'Как вам удобно переговорить устно или перепиской?'
    }
  },
  { id: '3', position: { x: 250, y: 450 }, data: { label: '/позвонитемне' } },
  { id: '4', position: { x: 50, y: 450 }, data: { label: '/напишитемне' } },
  {
    id: '5', position: { x: 150, y: 550 }, data: {
      label: 'Ок. Первый освободившийся менеджер сразу же с вами свяжется. Спасибо за обращение.'
    }
  },
  { id: '6', type: 'input', position: { x: 350, y: 550 }, data: { label: "phone number" } },
  { id: '7', position: { x: 350, y: 650 }, data: { label: " Уведомлять на номер" } },
  { id: '8', position: { x: 150, y: 650 }, data: { label: "БД" } }
];

const nodeTypes = {
  input: InputNode
};




const initialEdges = [{ id: 'e1-1', source: '0', target: '1' }, { id: 'e1-2', source: '1', target: '2' },
{ id: 'e1-3', source: '2', target: '3' }, { id: 'e1-4', source: '2', target: '4' },
{ id: 'e1-5', source: '3', target: '5' }, { id: 'e1-6', source: '4', target: '5' },
{ id: 'e1-7', source: '5', target: '6' }, { id: 'e1-8', source: '6', target: '7' },
{ id: 'e1-9', source: '5', target: '8' }];

export default function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [rfInstance, setRfInstance] = useState(null);


  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      try {
        const phone = document.getElementById('phonenumber');
        const phone_numb =
        {
          phone: phone.value
        }
        const json = JSON.stringify(phone_numb, null, 2);

        axios.get(`http://localhost:3000/phone_number:${phone.value}`,
          {
            params: phone_numb,
            headers:
            {
              'Content-Type': 'application/json',
            }
          })
          .then(response => {
            console.log('The request was successfull ', response.data);
          })
          .catch(error => {
            console.error('The request failsd :', error);
          });


      } catch (e) {
        console.error('could not save flow: ', e);
      }
    }
  }, [rfInstance]);




  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        elements={nodes.concat(edges)}
        onElementsRemove={() => { }}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}



        fitView
        onLoad={(reactFlowInstance) => reactFlowInstance.fitView()}
      >
        <Panel position="top-right">
          <button onClick={onSave}>save</button>

        </Panel>

        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />



      </ReactFlow>
    </div>
  );
}
