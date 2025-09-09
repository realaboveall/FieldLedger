import React from "react";
import ReactFlow, { Background, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

// ✅ Custom Decision Node (diamond shape)
const DecisionNode = ({ data }) => (
  <div className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center rotate-45 shadow-lg">
    <div className="-rotate-45 font-semibold">{data.label}</div>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

// ✅ Custom Process Node (rounded rectangle)
const ProcessNode = ({ data }) => (
  <div className="px-4 py-2 bg-green-500 text-white rounded-xl shadow-md font-medium">
    {data.label}
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = { decision: DecisionNode, process: ProcessNode };

const nodes = [
  // Farmer Flow
  {
    id: "1",
    type: "process",
    position: { x: 0, y: 150 },
    data: { label: "Farmer" },
  },
  {
    id: "2",
    type: "decision",
    position: { x: 200, y: 50 },
    data: { label: "Register" },
  },
  {
    id: "3",
    type: "decision",
    position: { x: 200, y: 250 },
    data: { label: "Login" },
  },
  {
    id: "4",
    type: "process",
    position: { x: 450, y: 150 },
    data: { label: "Fill Product Details" },
  },
  {
    id: "5",
    type: "decision",
    position: { x: 700, y: 50 },
    data: { label: "Form" },
  },
  {
    id: "6",
    type: "decision",
    position: { x: 700, y: 250 },
    data: { label: "Chatbot" },
  },
  {
    id: "7",
    type: "process",
    position: { x: 950, y: 150 },
    data: { label: "Ethereum Smart Contract" },
  },
  {
    id: "8",
    type: "process",
    position: { x: 1200, y: 150 },
    data: { label: "IPFS Hash Generation" },
  },
  {
    id: "9",
    type: "process",
    position: { x: 1450, y: 250 },
    data: { label: "IPFS Cart" },
  },
  {
    id: "10",
    type: "process",
    position: { x: 1700, y: 250 },
    data: { label: "QR" },
  },

  // Supply Chain Flow (after QR scan)
  {
    id: "11",
    type: "process",
    position: { x: 1900, y: 150 },
    data: { label: "Scan QR" },
  },
  {
    id: "12",
    type: "process",
    position: { x: 2100, y: 50 },
    data: { label: "Farm Harvest / Packaging / Transport" },
  },
  {
    id: "13",
    type: "process",
    position: { x: 2100, y: 200 },
    data: { label: "Packaging" },
  },
  {
    id: "14",
    type: "process",
    position: { x: 2100, y: 350 },
    data: { label: "Transportation" },
  },
  {
    id: "15",
    type: "process",
    position: { x: 2100, y: 500 },
    data: { label: "Consumers" },
  },
  {
    id: "16",
    type: "process",
    position: { x: 2400, y: 150 },
    data: { label: "Solidity (Smart Contract)" },
  },
  {
    id: "17",
    type: "process",
    position: { x: 2400, y: 300 },
    data: { label: "ZkChain (Polygon)" },
  },
  {
    id: "18",
    type: "process",
    position: { x: 2650, y: 150 },
    data: { label: "Kubo (IPFS Storage)" },
  },
  {
    id: "19",
    type: "process",
    position: { x: 2900, y: 150 },
    data: { label: "OpenCV QR Validation" },
  },
];

const edges = [
  // Farmer Flow edges
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e4-6", source: "4", target: "6" },
  { id: "e5-7", source: "5", target: "7" },
  { id: "e6-7", source: "6", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
  { id: "e8-9", source: "8", target: "9" },
  {
    id: "e9-10",
    label: "Open CV",
    source: "9",
    target: "10",
  },

  // Bridge QR → Scan QR
  { id: "e10-11", type: "arrow", source: "10", target: "11" },

  // Supply Chain edges
  { id: "e11-12", source: "11", target: "12" },
  { id: "e12-13", source: "12", target: "13" },
  { id: "e13-14", source: "13", target: "14" },
  { id: "e14-15", source: "14", target: "15" },

  // Blockchain + Storage interactions
  { id: "e12-16", source: "12", target: "16" },
  { id: "e13-16", source: "13", target: "16" },
  { id: "e14-16", source: "14", target: "16" },
  { id: "e15-16", source: "15", target: "16" },
  { id: "e16-17", source: "16", target: "17" },
  { id: "e16-18", source: "16", target: "18" },
  { id: "e18-19", source: "18", target: "19" },
];

const IntegratedFlowchart = () => {
  return (
    <div className="w-full h-screen bg-gray-100 z-45 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right">
        <Background color="#aaa" gap={20} />
      </ReactFlow>
    </div>
  );
};

export default IntegratedFlowchart;
