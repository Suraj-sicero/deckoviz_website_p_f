"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import * as THREE from 'three'

/* ---------------- Three.js Background Component ---------------- */

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000
    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    // Violet to cyan gradient colors
    const colors = [
      new THREE.Color(0x8B5CF6), // Violet
      new THREE.Color(0xA78BFA), // Light violet
      new THREE.Color(0x06B6D4), // Cyan
      new THREE.Color(0x14B8A6), // Teal
      new THREE.Color(0x6366F1), // Indigo
    ]

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15
      posArray[i + 1] = (Math.random() - 0.5) * 15
      posArray[i + 2] = (Math.random() - 0.5) * 10

      // Color
      const color = colors[Math.floor(Math.random() * colors.length)]
      colorArray[i] = color.r
      colorArray[i + 1] = color.g
      colorArray[i + 2] = color.b
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    )
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colorArray, 3)
    )

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    particlesRef.current = particlesMesh

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      if (particlesRef.current) {
        // Rotate particles
        particlesRef.current.rotation.y = elapsedTime * 0.05
        particlesRef.current.rotation.x = elapsedTime * 0.03

        // Wave effect
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const z = positions[i + 2]
          positions[i + 1] = Math.sin(x * 0.5 + elapsedTime) * 0.5 + 
                            Math.cos(z * 0.5 + elapsedTime) * 0.5
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true

        // Mouse interaction
        particlesRef.current.rotation.x += mouseRef.current.y * 0.0005
        particlesRef.current.rotation.y += mouseRef.current.x * 0.0005
      }

      // Camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5
      camera.position.y = Math.cos(elapsedTime * 0.15) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      rendererRef.current?.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

/* ---------------- Button Component ---------------- */

type ButtonProps = {
  variant: "primary" | "outline"
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 px-5 py-3 text-base rounded-xl shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[140px]"

  const variantClasses = {
    primary:
      "border border-gray-500 text-white hover:from-[#5a54d1] hover:to-[#3a8bc2] shadow-[0_2px_8px_0_rgba(76,110,245,0.10)]",
    outline:
      "bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100/60 shadow-[0_2px_8px_0_rgba(76,110,245,0.06)]",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/* ---------------- CountUp Animation ---------------- */

type CountUpProps = {
  from: number
  to: number
  duration: number
  decimals?: number
  suffix?: string
}

const CountUp: React.FC<CountUpProps> = ({
  from,
  to,
  duration,
  decimals = 0,
  suffix = "",
}) => {
  const [count, setCount] = useState<number>(from)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const current = from + (to - from) * progress

      setCount(current)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ---------------- Hero Component ---------------- */

const Hero: React.FC = () => {
  const rotatingTexts = [
    "art canvas",
    "smart photo frame",
    "storytelling portal",
    "mood setter",
    "Google TV",
  ]

  const [rotatingIndex, setRotatingIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const [leftImageIndex, setLeftImageIndex] = useState(0)
  const [rightImageIndex, setRightImageIndex] = useState(0)

  const frameImages = Array.from({ length: 22 }, (_, i) => `/images/herol (${i + 1}).png`)

  const rightImages = [
    "/images/righthero1.png",
    "/images/righthero2.png",
    "/images/righthero4.png",
    "/images/righthero5.png",
    "/images/righthero6.png",
    "/images/righthero7.png",
    "/images/righthero8.png",
    "/images/righthero9.png",
    "/images/righthero10.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImageIndex((prev) => {
        let next
        do {
          next = Math.floor(Math.random() * frameImages.length)
        } while (next === prev)
        return next
      })

      setRightImageIndex((prev) => {
        let next
        do {
          next = Math.floor(Math.random() * rightImages.length)
        } while (next === prev)
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const normalMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 840 560'%3E%3Cpath d='M80 16C80 7.16 87.16 0 96 0H824C832.84 0 840 7.16 840 16V464C840 472.84 832.84 480 824 480H780C751.16 480 744 487.16 744 496V544C744 552.84 736.84 560 728 560H16C7.16 560 0 552.84 0 544V96C0 87.16 7.16 80 16 80H64C72.84 80 80 72.84 80 64V16Z' fill='black'/%3E%3C/svg%3E")`

  const reversedMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 840 560'%3E%3Cpath d='M760 16C760 7.16 752.84 0 744 0H16C7.16 0 0 7.16 0 16V464C0 472.84 7.16 480 16 480H80C88.84 480 96 487.16 96 496V544C96 552.84 103.16 560 112 560H824C832.84 560 840 552.84 840 544V96C840 87.16 832.84 80 824 80H776C767.16 80 760 72.84 760 64V16Z' fill='black'/%3E%3C/svg%3E")`

  const currentMask =
    rightImageIndex % 2 === 0 ? normalMask : reversedMask
  return (
    
<section className="relative w-full min-h-screen overflow-x-hidden py-12 md:py-20 flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}>
      {/* Three.js Particle Background */}
      <ThreeBackground />
      
      {/* Glow animation */}
      <style
  dangerouslySetInnerHTML={{
    __html: `
      @keyframes pulse-glow {
        0% { box-shadow: 0 0 5px rgba(138,43,226,.2); }
        50% { box-shadow: 0 0 25px rgba(138,43,226,.6); }
        100% { box-shadow: 0 0 5px rgba(138,43,226,.2); }
      }

      @keyframes liquid-flow-waves {
        0% { background-position: 0px 0px, 0px 0px; }
        100% { background-position: 300px 0px, -300px 0px; }
      }

      .liquid-gradient-blue {
        background: 
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cpath fill='%232563EB' d='M0,140 Q100,80 200,140 T400,140 L400,300 L0,300 Z'/%3E%3C/svg%3E") 0 0 / 300px 100% repeat-x,
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cpath fill='%2360A5FA' opacity='0.6' d='M0,100 Q100,40 200,100 T400,100 L400,300 L0,300 Z'/%3E%3C/svg%3E") 0 0 / 300px 100% repeat-x,
          #EFF6FF;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(37, 99, 235, 0.3);
        animation: liquid-flow-waves 3s linear infinite;
        display: inline-block;
      }
      
      .liquid-gradient-cyan {
        background: 
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cpath fill='%2306B6D4' d='M0,140 Q100,80 200,140 T400,140 L400,300 L0,300 Z'/%3E%3C/svg%3E") 0 0 / 300px 100% repeat-x,
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cpath fill='%2367E8F9' opacity='0.6' d='M0,100 Q100,40 200,100 T400,100 L400,300 L0,300 Z'/%3E%3C/svg%3E") 0 0 / 300px 100% repeat-x,
          #CFFAFE;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(6, 182, 212, 0.3);
        animation: liquid-flow-waves 3s linear infinite;
        display: inline-block;
      }

      .shop-now-glow {
        animation: pulse-glow 3s infinite ease-in-out;
      }

      /* Hide scrollbar but allow scroll */
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }

      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `,
  }}
/>

      {/* Background Glow - reduced opacity to work with Three.js */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-violet-200 blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* Heading */}
        <h1 className="text-center font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 max-w-5xl pt-8 leading-tight">
          <div className="inline">
            <span className="text-black">Make Your Space Come </span>
            <span className="italic liquid-gradient-blue">
              Alive
            </span>
            <span className="text-black">,</span>
          </div>
          <br />
          <div className="inline">
            <span className="text-black">With Your Personal </span>
            <span className="italic liquid-gradient-cyan">
              Art Frame
            </span>
          </div>
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-600 text-base sm:text-xl mb-8 sm:mb-10 max-w-3xl leading-relaxed px-2">
          Deckoviz DAS Portal is an{" "}
          <span className="text-violet-600 font-semibold">AI-powered art frame</span>{" "}
          that learns your taste and evolves with you, to paint your{" "}
          <span className="text-indigo-600 font-semibold">
            inner world, memories, and imagination
          </span>{" "}
          on your walls as your evolving{" "}
          <span className="inline-block font-semibold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            {rotatingTexts[rotatingIndex]}
          </span>.
        </p>

        {/* Layout */}
  <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 xl:gap-8 px-4">

          {/* LEFT IMAGE */}
        <div className="relative flex justify-center lg:justify-end w-full lg:w-auto flex-shrink-0 max-w-[400px] lg:max-w-[480px] xl:max-w-[520px]">
          <div className="relative w-[280px] h-[240px] sm:w-[340px] sm:h-[290px] md:w-[400px] md:h-[340px] lg:w-[440px] lg:h-[380px] xl:w-[480px] xl:h-[420px] overflow-visible">

          {/* Room image */}
          <img
            src="/images/hero_left.png"
            alt="Living room"
            loading="lazy"
            className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[82%] h-auto object-contain rounded-[40px] sm:rounded-[50px] lg:rounded-[60px]"
          />

        {/* Frame artwork */}
        <div className="relative w-full max-w-[900px] aspect-[16/9] mx-auto">
          <div className="absolute 
            top-[28.5%] 
            left-[50.25%] -translate-x-1/2
            w-[50%] 
            h-[46%]
            overflow-hidden rounded-sm">

            {frameImages.map((img, index) => (
              <img
                key={index}
                src={img}
                loading="lazy"
                alt={`Frame artwork ${index}`}
                className={`absolute inset-0 w-full h-full object-fill transition-opacity duration-1000 ease-in-out will-change-opacity ${
                  index === leftImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          </div>

          </div>
        </div>

          {/* CENTER */}
          <div className="flex flex-col items-center gap-4 w-full lg:w-auto lg:max-w-[280px] xl:max-w-[320px] flex-shrink-0">
            <div className="flex gap-5 flex-wrap justify-center">
              <div className="relative inline-block group">
                <button
                  onClick={() => (window.location.href = "/place-order")}
                  className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full px-8 py-3.5 text-sm tracking-widest uppercase overflow-hidden relative z-10 group text-white transform hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] bg-gradient-to-r from-indigo-900 via-indigo-700 to-blue-600 shadow-[0_5px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.6)] border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Shop Now
                  </span>
                </button>
              </div>

              <button
                onClick={() => (window.location.href = "/about")}
                className="inline-flex items-center justify-center font-bold transition-all duration-500 rounded-full px-8 py-3 text-sm tracking-widest uppercase overflow-hidden relative z-10 group bg-white/90 backdrop-blur-sm border-2 border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-white hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98] shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full z-0" />
                
                {/* Button text with arrow */}
                <span className="relative z-10 flex items-center gap-2">
                  Learn More
                  <ArrowRight
                    size={16}
                    className="transition-all duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>
            
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes heroFlowColors {
                  0% { background-position: 0% 50%; }
                  100% { background-position: 100% 50%; }
                }
                @keyframes heroGradientShift {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `
            }} />

            {/* Stats Card - Enhanced with animations */}
            <div className="relative group w-full max-w-2xl">
              {/* Floating decorative elements */}
              <div className="absolute -left-8 top-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-60 blur-sm animate-float-slow" />
              <div className="absolute -right-6 bottom-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-indigo-500 opacity-50 blur-sm animate-float-slower" />
              <div className="absolute -bottom-4 left-1/3 w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 opacity-60 blur-sm animate-float-medium" />
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-200 via-pink-200 to-indigo-200 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Main card */}
              <div 
                className="relative rounded-3xl px-6 py-6 w-full overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)]"
                style={{
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.40)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.70)",
                  boxShadow: "0 12px 40px rgba(31, 38, 135, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.60)"
                }}
              >
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                </div>
                
                {/* Top stats - Horizontal layout */}
                <div className="flex items-start justify-center gap-4 mb-6">
                  
                  {/* Items stat */}
                  <div className="relative flex flex-col items-center">
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl blur-lg" />
                    <div className="relative flex flex-col items-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-1 animate-pulse-slow leading-none">
                        <CountUp from={0} to={3} duration={2} suffix="M+" />
                      </div>
                      <div className="text-gray-600 font-medium text-xs whitespace-nowrap">Items in Library</div>
                    </div>
                  </div>

                  {/* Rating stat */}
                  <div className="relative flex flex-col items-center">
                    <div className="absolute -inset-2 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-2xl blur-lg" />
                    <div className="relative flex flex-col items-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mb-1 flex items-center gap-1 animate-pulse-slow leading-none">
                        <CountUp from={0} to={4.9} duration={2} decimals={1} />
                        <span className="text-2xl">✨</span>
                      </div>
                      <div className="text-gray-600 font-medium text-xs whitespace-nowrap">Star Rating</div>
                    </div>
                  </div>
                </div>

                {/* Divider with gradient */}
                <div className="relative h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent mb-6" />

                {/* Infinity stat */}
                <div className="text-center relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-violet-400/20 to-indigo-500/20 rounded-2xl blur-xl" />
                  <div className="relative flex flex-col items-center">
                    {/* Animated infinity symbol */}
                    <div className="inline-block relative mb-2">
                      <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%]">
                        ∞
                      </div>
                      {/* Orbiting dots */}
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-violet-500 rounded-full animate-orbit" />
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-orbit-reverse" />
                    </div>
                    <div className="text-gray-600 font-medium text-sm">Ways of Exploring</div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes float-slow {
                  0%, 100% { transform: translateY(0px) translateX(0px); }
                  50% { transform: translateY(-20px) translateX(10px); }
                }
                
                @keyframes float-slower {
                  0%, 100% { transform: translateY(0px) translateX(0px); }
                  50% { transform: translateY(-25px) translateX(-15px); }
                }
                
                @keyframes float-medium {
                  0%, 100% { transform: translateY(0px) translateX(0px); }
                  50% { transform: translateY(-15px) translateX(8px); }
                }
                
                @keyframes pulse-slow {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.9; transform: scale(1.02); }
                }
                
                @keyframes orbit {
                  0% { transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg); }
                }
                
                @keyframes orbit-reverse {
                  0% { transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(-360deg) translateX(40px) rotate(360deg); }
                }
                
                .animate-float-slow {
                  animation: float-slow 6s ease-in-out infinite;
                }
                
                .animate-float-slower {
                  animation: float-slower 8s ease-in-out infinite;
                }
                
                .animate-float-medium {
                  animation: float-medium 7s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                  animation: pulse-slow 3s ease-in-out infinite;
                }
                
                .animate-orbit {
                  animation: orbit 8s linear infinite;
                }
                
                .animate-orbit-reverse {
                  animation: orbit-reverse 8s linear infinite;
                }
              `
            }} />
          </div>

          {/* RIGHT IMAGE */}
<div className="relative flex justify-center lg:justify-start w-full lg:w-auto flex-shrink-0 max-w-[350px] lg:max-w-[420px] xl:max-w-[460px]">

          <div
            className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[260px] lg:w-[380px] lg:h-[280px] xl:w-[420px] xl:h-[300px] overflow-hidden bg-gray-50"
            style={{
              WebkitMaskImage: currentMask,
              maskImage: currentMask,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transition: "all 0.5s ease"
            }}
          >
            {rightImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                loading="lazy"
                style={{
                  // borderRadius:'30px'
                }}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  index === rightImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

        </div>

        </div>
      </div>
    </section>
  )
}

export default Hero

