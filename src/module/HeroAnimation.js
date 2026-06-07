class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 1.5 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.5 + 0.1
    const colors = ['0, 255, 136', '0, 212, 255', '180, 74, 255']
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (
      this.x < 0 ||
      this.x > this.canvas.width ||
      this.y < 0 ||
      this.y > this.canvas.height
    ) {
      this.reset()
    }
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(${ this.color }, ${ this.opacity })`
    this.ctx.fill()
  }
}

class HeroAnimation {
  classes = {
    canvasElement: '#hero-canvas',
  }

  constructor() {
    this.canvasElement = document.querySelector(this.classes.canvasElement)
    if (!this.canvasElement) return

    this.ctx = this.canvasElement.getContext('2d')
    this.particles = []
    this.animId = null

    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.animate = this.animate.bind(this)

    this.resizeCanvas()
    window.addEventListener('resize', this.resizeCanvas)

    this.init()
    this.animate()
  }

  resizeCanvas() {
    const oldWidth = this.canvasElement.width || this.canvasElement.offsetWidth
    const oldHeight = this.canvasElement.height || this.canvasElement.offsetHeight

    const newWidth = this.canvasElement.offsetWidth
    const newHeight = this.canvasElement.offsetHeight

    this.canvasElement.width = newWidth
    this.canvasElement.height = newHeight

    if (this.particles && this.particles.length > 0) {
      this.particles.forEach(p => {
        p.x = (p.x / oldWidth) * newWidth
        p.y = (p.y / oldHeight) * newHeight
      })
    }
  }

  init() {
    for (let i = 0; i < 200; i++) {
      this.particles.push(new Particle(this.canvasElement, this.ctx))
    }
  }

  animate() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height,
    )

    this.particles.forEach((p) => {
      p.update()
      p.draw()
    })

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          this.ctx.beginPath()
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.strokeStyle = `rgba(0, 255, 136, ${ 0.03 * (1.5 - dist / 120) })`
          this.ctx.lineWidth = 0.5
          this.ctx.stroke()
        }
      }
    }

    this.animId = requestAnimationFrame(this.animate)
  }
}

export default HeroAnimation
