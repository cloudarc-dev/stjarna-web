"use client"
import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export const InteractiveGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mouse = { x: -1000, y: -1000 }
    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    resizeCanvas()

    const particles: { x: number; y: number; baseX: number; baseY: number }[] = []
    const spacing = 50

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        particles.push({ x, y, baseX: x, baseY: y })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = theme === "dark"
      const baseColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      const spotlightColor = "hsl(var(--primary))"

      particles.forEach((p) => {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        const forceDirectionX = (p.x - mouse.x) / dist
        const forceDirectionY = (p.y - mouse.y) / dist
        const maxDistance = 300
        const force = (maxDistance - dist) / maxDistance
        const directionX = forceDirectionX * force * 20
        const directionY = forceDirectionY * force * 20

        if (dist < maxDistance) {
          p.x += directionX
          p.y += directionY
        } else {
          if (p.x !== p.baseX) {
            const dx = p.x - p.baseX
            p.x -= dx / 10
          }
          if (p.y !== p.baseY) {
            const dy = p.y - p.baseY
            p.y -= dy / 10
          }
        }

        const opacity = 1 - Math.min(dist / 200, 1)
        ctx.globalAlpha = 1
        if (dist < 150) {
          ctx.fillStyle = spotlightColor
          ctx.globalAlpha = opacity * 0.8
        } else {
          ctx.fillStyle = baseColor
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />
}
