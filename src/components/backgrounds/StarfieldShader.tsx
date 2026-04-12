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

  // Pseudo-random function
  float hash21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p + 23.45);
    return fract(p.x * p.y);
  }

  // Draw a star shape
  float star(vec2 uv, float flare) {
    float d = length(uv);
    float m = 0.05 / d;
    
    float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare;
    
    // Rotate for diagonal rays
    uv *= mat2(0.7071, -0.7071, 0.7071, 0.7071);
    rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * 0.3 * flare;

    m *= smoothstep(1.0, 0.2, d);
    return m;
  }

  vec3 starLayer(vec2 uv) {
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    for(int y=-1; y<=1; y++) {
      for(int x=-1; x<=1; x++) {
        vec2 offs = vec2(float(x), float(y));
        float n = hash21(id + offs); // random value between 0 and 1
        
        float size = fract(n * 345.32);
        
        vec2 p = offs - gv + vec2(n, fract(n * 34.0)) - 0.5;
        
        float flare = smoothstep(0.8, 1.0, size);
        float starVal = star(p, flare) * size;
        
        // Color variation (AutaKimi palette: purples, blues, white)
        vec3 color = sin(vec3(0.2, 0.3, 0.9) * fract(n * 2345.2) * 123.2) * 0.5 + 0.5;
        color = mix(color, vec3(0.6, 0.2, 1.0), 0.5); // Bias towards purple
        
        // Twinkle
        starVal *= sin(uTime * 3.0 + n * 6.2831) * 0.4 + 0.6;
        
        col += starVal * color;
      }
    }
    return col;
  }

  void main() {
    // Normalize and fix aspect ratio
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    
    // Cinematic motion (forward and slightly right)
    vec2 drift = vec2(uTime * 0.05, uTime * 0.01);

    float t = uTime * 0.05;
    
    vec3 col = vec3(0.0);
    
    // Base dark background
    col += vec3(0.02, 0.01, 0.05);

    // Multiple layers of stars for parallax effect
    for(float i=0.0; i<1.0; i+=1.0/4.0) {
      float depth = fract(i + t);
      float scale = mix(10.0, 0.5, depth);
      float fade = depth * smoothstep(1.0, 0.9, depth);
      
      // Cinematic drift scales differently per layer (parallax)
      vec2 layerUv = uv + drift * (i * 2.0);
      
      col += starLayer(layerUv * scale + i * 453.2) * fade;
    }
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function StarfieldShader() {
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
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
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
