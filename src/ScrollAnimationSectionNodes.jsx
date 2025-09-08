import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

gsap.registerPlugin(ScrollTrigger);

// ✅ Define nodes & edges outside the component
const nodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "2", position: { x: 200, y: 0 }, data: { label: "Step 1" } },
  { id: "3", position: { x: 400, y: 0 }, data: { label: "Step 2" } },
  { id: "4", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "5", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "6", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "7", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "8", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "9", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "10", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "11", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "12", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "13", position: { x: 600, y: 0 }, data: { label: "End" } },
  { id: "14", position: { x: 600, y: 0 }, data: { label: "End" } },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

const ScrollAnimationSectionNodes = () => {
  const sectionRef = useRef(null);
  const flowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: 1,
      },
    });

    // Wait until React Flow finishes rendering
    setTimeout(() => {
      const nodeEls = flowRef.current.querySelectorAll(".react-flow__node");
      const edgeEls = flowRef.current.querySelectorAll(
        ".react-flow__edge-path"
      );

      // ✅ Hide nodes initially
      gsap.set(nodeEls, { opacity: 0, y: 50 });

      // ✅ Hide edges initially using stroke-dasharray trick
      edgeEls.forEach((edge) => {
        const length = edge.getTotalLength();
        edge.style.strokeDasharray = length;
        edge.style.strokeDashoffset = length;
      });

      // ✅ Animate nodes + edges step by step
      nodeEls.forEach((node, i) => {
        // Show node
        tl.to(node, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // Draw edge right after node (if exists)
        if (edgeEls[i]) {
          tl.to(edgeEls[i], {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      });
    }, 200);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <div ref={flowRef} className="w-full h-[400px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}>
          <Background />
          {/* <Controls /> */}
        </ReactFlow>
      </div>
    </div>
  );
};

export default ScrollAnimationSectionNodes;
