function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.reset()
  }

  _cssW() {
    return this.canvas.width / (window.devicePixelRatio || 1)
  }

  _cssH() {
    return this.canvas.height / (window.devicePixelRatio || 1)
  }

  reset() {
    this.x = Math.random() * this._cssW()
    this.y = Math.random() * this._cssH()
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
      this.x < 0 || this.x > this._cssW() ||
      this.y < 0 || this.y > this._cssH()
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    this.canvasElement = document.querySelector(this.classes.canvasElement)
    if (!this.canvasElement) return

    this.ctx = this.canvasElement.getContext('2d')
    this.particles = []
    this.animId = null

    this.animate = this.animate.bind(this)

    this.resizeCanvas()

    // ResizeObserver — реагирует только на реальное изменение canvas,
    // не на dvh-прыжки при скролле
    this._resizeObserver = new ResizeObserver(debounce(() => {
      this.resizeCanvas()
      this.particles = []
      this.init()
    }, 200))
    this._resizeObserver.observe(this.canvasElement)

    this.init()
    this.animate()
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1
    const w = this.canvasElement.offsetWidth
    const h = this.canvasElement.offsetHeight

    this.canvasElement.width = w * dpr
    this.canvasElement.height = h * dpr

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  _getParticleCount() {
    const w = window.innerWidth
    if (w <= 767) return 40
    if (w <= 1023) return 80
    return 100
  }

  init() {
    const count = this._getParticleCount()
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.canvasElement, this.ctx))
    }
  }

  animate() {
    const dpr = window.devicePixelRatio || 1
    const cssW = this.canvasElement.width / dpr
    const cssH = this.canvasElement.height / dpr

    this.ctx.clearRect(0, 0, cssW, cssH)

    this.particles.forEach(p => {
      p.update()
      p.draw()
    })

    const THRESHOLD = 120
    const THRESHOLD_SQ = THRESHOLD * THRESHOLD

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const distSq = dx * dx + dy * dy

        if (distSq < THRESHOLD_SQ) {
          const dist = Math.sqrt(distSq)
          this.ctx.beginPath()
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.strokeStyle = `rgba(0, 255, 136, ${ 0.03 * (1.5 - dist / THRESHOLD) })`
          this.ctx.lineWidth = 0.5
          this.ctx.stroke()
        }
      }
    }

    this.animId = requestAnimationFrame(this.animate)
  }
}

export default HeroAnimation
