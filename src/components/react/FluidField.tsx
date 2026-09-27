/** @jsxImportSource react */
// Fluid Orb — Rare UI (https://www.rareui.com/components/fluidorb)
// Source as pasted by Den on 27 Sep 2026. Rare UI licence: MIT + Commons Clause + attribution.
// Keep this React component in React (no porting to other frameworks); visible credit to rareui.com required.
// modified: rectangular fill, site palette
// modified: colour props (base, mid, color)
'use client'

import React, { useEffect, useRef } from 'react'

export type FluidFieldProps = React.ComponentProps<'div'> & {
  /** Top of the ramp. */
  color?: string
  /** Bottom of the ramp. */
  base?: string
  /** Middle band; defaults to halfway between base and color, as in the original. */
  mid?: string
  /** smoothstep edges of the top band; raise them to shrink how much of the box reaches `color`. */
  highlight?: [number, number]
  /** Seconds added to the shader clock, so several fields on one page don't move in lockstep. */
  timeOffset?: number
}

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform vec3 u_base;
uniform vec3 u_mid;
uniform vec2 u_highlight;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.22;
  float aspect = u_resolution.x / u_resolution.y;

  vec2 drift = vec2(
    sin(t) + 0.6 * sin(t * 1.7 + 1.3),
    cos(t * 0.8) + 0.6 * cos(t * 1.3 + 2.1)
  );

  // Scale x by the box aspect so the noise stays round instead of stretching across the wide slot.
  vec2 p = vec2(uv.x * aspect, uv.y * 1.0) + drift * 0.7;

  vec2 q = vec2(fbm(p + drift), fbm(p + vec2(3.2, 1.5) - drift));
  float f = fbm(p + 1.2 * q);

  float g = clamp(1.0 - uv.y, 0.0, 1.0);
  float anchor = smoothstep(0.0, 0.3, uv.y);
  float shade = clamp(g + (f - 0.5) * 0.8 * anchor, 0.0, 1.0);

  vec3 light = u_mid;
  vec3 dark = u_color;

  vec3 col = u_base;
  col = mix(col, light, smoothstep(0.28, 0.52, shade));
  col = mix(col, dark, smoothstep(u_highlight.x, u_highlight.y, shade));

  gl_FragColor = vec4(col, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  const n = parseInt(h, 16)
  if (h.length !== 6 || Number.isNaN(n)) return [0.1, 0.45, 0.95]
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const FluidField = ({
  color = '#4B47FF',
  base = '#23232B',
  mid,
  highlight = [0.58, 0.88],
  timeOffset = 0,
  className,
  style,
  ...props
}: FluidFieldProps) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    // No WebGL: render nothing and let the slot keep its plain background.
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true })
    if (!gl) return

    const program = gl.createProgram()
    const vert = compile(gl, gl.VERTEX_SHADER, VERT)
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!program || !vert || !frag) return

    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    gl.uniform3f(gl.getUniformLocation(program, 'u_color'), ...hexToRgb(color))
    gl.uniform3f(gl.getUniformLocation(program, 'u_base'), ...hexToRgb(base))
    const baseRgb = hexToRgb(base), colorRgb = hexToRgb(color)
    const midRgb = mid ? hexToRgb(mid) : baseRgb.map((c, i) => (c + colorRgb[i]) / 2) as [number, number, number]
    gl.uniform3f(gl.getUniformLocation(program, 'u_mid'), ...midRgb)
    gl.uniform2f(gl.getUniformLocation(program, 'u_highlight'), highlight[0], highlight[1])

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    // Elapsed time only advances while running, so a pause doesn't jump the fluid.
    let elapsed = 0
    let last = 0
    let raf = 0
    let onScreen = false

    const draw = () => {
      gl.uniform1f(uTime, (reduce ? 0 : elapsed / 1000) + timeOffset)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    const frame = (now: number) => {
      elapsed += now - last
      last = now
      draw()
      raf = requestAnimationFrame(frame)
    }
    const sync = () => {
      const run = !reduce && onScreen && !document.hidden
      if (run && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      } else if (!run && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const resize = () => {
      // The field is soft, so touch devices render it at 1x and let the compositor scale; saves most of the GPU work.
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 2)
      const w = Math.max(1, Math.round(wrap.clientWidth * dpr))
      const h = Math.max(1, Math.round(wrap.clientHeight * dpr))
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uResolution, w, h)
      draw()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)
    resize()

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })
    visibility.observe(wrap)
    document.addEventListener('visibilitychange', sync)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', sync)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buffer)
    }
  }, [color, base, mid, highlight[0], highlight[1], timeOffset])

  return (
    <div
      ref={wrapRef}
      data-slot="fluid-field"
      className={['fluid-field', className].filter(Boolean).join(' ')}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
      {...props}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}

export default FluidField
