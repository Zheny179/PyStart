import Chapter from './Chapter/Chapter'

class Navigation {
  selectors = {
    navigation: '[data-navigation]',
    navigationButtonArrow: '[data-navigation-button-arrow]',
    navigationButton: '[data-navigation-button]',
    chapter: '.chapter',
  }

  stateClasses = {
    navigationCollapsed: 'navigation--collapsed',
    animate: 'animat',
    isLock: 'is-lock',
  }

  constructor(element) {
    this.navigationElement = element
    if (!this.navigationElement) return

    this.navigationButtonArrowElement = this.navigationElement.querySelector(
      this.selectors.navigationButtonArrow
    )
    this.navigationButtonElements = this.navigationElement.querySelectorAll(
      this.selectors.navigationButton
    )

    this.chapters = []
    this.init()
  }

  init() {
    this.navigationButtonElements.forEach((navigationButtonElement) => {
      if (navigationButtonElement) {
        navigationButtonElement.addEventListener('click', this.toggleNavigation)
      }
    })

    this.initChapters()

    if (this.navigationButtonArrowElement) {
      this.navigationButtonArrowElement.addEventListener('click', () => {
        this.animateArrowButton()
        this.openAllChapters()
      })

      this.navigationButtonArrowElement.addEventListener('animationend', () => {
        this.navigationButtonArrowElement.classList.remove(
          this.stateClasses.animate
        )
      })
    }
  }

  toggleNavigation = () => {
    this.navigationElement.classList.toggle(
      this.stateClasses.navigationCollapsed
    )

    document.documentElement.classList.remove(this.stateClasses.isLock)
  }

  animateArrowButton() {
    this.navigationButtonArrowElement.classList.add(this.stateClasses.animate)
  }

  initChapters() {
    const chapterElements = this.navigationElement.querySelectorAll(
      this.selectors.chapter
    )

    this.chapters = Array.from(chapterElements).map((el) => new Chapter(el))
  }

  openAllChapters() {
    this.chapters.forEach((chapter) => chapter.open())
  }
}

export default Navigation
