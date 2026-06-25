import Chapter from './Chapter/Chapter'

class Navigation {
  selectors = {
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
      navigationButtonElement?.addEventListener('click', this.toggleNavigation)
    })

    this.initChapters()

    if (this.navigationButtonArrowElement) {
      this.navigationButtonArrowElement.addEventListener(
        'click',
        this.handleArrowClick
      )
      this.navigationButtonArrowElement.addEventListener(
        'animationend',
        this.handleAnimationEnd
      )
    }

    this.navigationElement.addEventListener('close-menu', this.closeNavigation)
  }

  toggleNavigation = () => {
    this.navigationElement.classList.toggle(
      this.stateClasses.navigationCollapsed
    )
    document.documentElement.classList.remove(this.stateClasses.isLock)
  }

  closeNavigation = () => {
    this.navigationElement.classList.remove(
      this.stateClasses.navigationCollapsed
    )
    document.documentElement.classList.remove(this.stateClasses.isLock)
  }

  handleArrowClick = () => {
    this.navigationButtonArrowElement.classList.add(this.stateClasses.animate)
    this.openAllChapters()
  }

  handleAnimationEnd = () => {
    this.navigationButtonArrowElement.classList.remove(
      this.stateClasses.animate
    )
  }

  initChapters() {
    const chapterElements = this.navigationElement.querySelectorAll(
      this.selectors.chapter
    )
    this.chapters = Array.from(chapterElements).map((el) => new Chapter(el))
  }

  openAllChapters() {
    this.chapters.forEach(
      (chapter) => typeof chapter.open === 'function' && chapter.open()
    )
  }
}

function InitNavigation() {
  const navigationElements = document.querySelectorAll('[data-navigation]')
  navigationElements.forEach((element) => new Navigation(element))
}

export default InitNavigation
