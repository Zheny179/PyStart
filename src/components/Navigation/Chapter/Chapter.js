class Chapter {
  selectors = {
    header: '.chapter__header',
  }

  stateClasses = {
    open: 'chapter--open',
  }

  constructor(element) {
    this.chapterElement = element

    if (!this.chapterElement) return

    this.headerElement = this.chapterElement.querySelector(
      this.selectors.header
    )
    this.init()
  }

  init() {
    if (this.headerElement) {
      // Привязываем контекст стрелочной функцией для сохранности "this"
      this.headerElement.addEventListener('click', this.toggle)
    }
  }

  toggle = () => {
    this.chapterElement.classList.toggle(this.stateClasses.open)
  }

  open = () => {
    this.chapterElement.classList.remove(this.stateClasses.open)
  }
}

export default Chapter
