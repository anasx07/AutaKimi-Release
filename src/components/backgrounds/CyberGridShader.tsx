"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position; // -1 to 1
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    // Cinematic slow pitch/yaw instead of mouse tracking
    vec2 drift = vec2(sin(uTime * 0.2) * 0.1, cos(uTime * 0.1) * 0.05);

    // Tilt the plane based on drift and Y axis
    float ty = uv.y - 0.2 - drift.y;
    float tx = uv.x - drift.x * 0.5;

    // Horizon fade
    if (ty > 0.0) {
      gl_FragColor = vec4(0.01, 0.01, 0.03, 1.0); // Dark sky
      return;
    }

    vec3 col = vec3(0.0);

    // Grid coordinates
    vec2 gridUv = vec2(tx / abs(ty), 1.0 / abs(ty));
    
    // Move grid forward
    gridUv.y += uTime * 2.0;

    // Create grid lines
    vec2 grid = fract(gridUv) - 0.5;
    vec2 gridLines = smoothstep(0.45, 0.5, abs(grid));
    
    // Combine X and Y lines
    float lineVal = max(gridLines.x, gridLines.y);

    // Depth fading (fog)
    float depth = smoothstep(0.0, 1.0, abs(ty) * 3.0);
    
    // Neon purple grid color (Kiwi Style)
    vec3 lineColor = vec3(0.54, 0.36, 0.96) * lineVal;
    
    // Enhance brightness near the "camera"
    lineColor *= depth;

    // Background color
    vec3 bgColor = mix(vec3(0.1, 0.05, 0.2), vec3(0.01, 0.01, 0.03), depth);
    
    col = bgColor + lineColor;

    // Horizon glow
    float glow = smoothstep(0.2, 0.0, abs(ty));
    col += vec3(0.8, 0.2, 1.0) * glow * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function CyberGridShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const vertices = new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "uTime");
    const resLoc = gl.getUniformLocation(program, "uResolution");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = (time: number) => {
      const deltaT = (time - startTime) / 1000;
      
      gl.useProgram(program);
      gl.uniform1f(timeLoc, deltaT);
      gl.uniform2f(resLoc, canvas.width, canvas.height);


      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] w-full h-full pointer-events-none" />;
}
