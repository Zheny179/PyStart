class OverlayMenu {
  classes = {
    root: '#full-screen-menu',
    burgerButton: '#hamburger-btn',
    closeButton: '#menu-close-btn'
  }

  stated = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(this.classes.root)
    this.burgerButtonElement = document.querySelector(this.classes.burgerButton)
    this.closeButtonElement = document.querySelector(this.classes.closeButton)
    this.bind()
  }

  bind() {
    if (this.burgerButtonElement) {
      this.burgerButtonElement.addEventListener('click', this.onButtonOpenClick)
    }

    if (this.closeButtonElement) {
      this.closeButtonElement.addEventListener('click', this.onButtonCloseClick)
    }
  }

  onButtonOpenClick = () => {
    this.rootElement.classList.toggle(this.stated.isActive)
    document.documentElement.classList.add(this.stated.isLock)
  }

  onButtonCloseClick = () => {
    this.rootElement.classList.remove(this.stated.isActive)
    document.documentElement.classList.remove(this.stated.isLock)
  }
}

export default OverlayMenu
