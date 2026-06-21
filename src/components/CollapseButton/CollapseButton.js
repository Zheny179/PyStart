class CollapseButton {
  selectors = {
    collapseButton: '[data-collapse-button]',
  }

  stateClasses = {
    isOpen: 'collapse-button--open',
  }

  constructor() {
    this.collapseButtonElements = document.querySelectorAll(
      this.selectors.collapseButton
    )

    this.bind()
  }

  bind() {
    this.collapseButtonElements.forEach((collapseButtonElement) => {
      collapseButtonElement.addEventListener('click', this.onChangeClickButton)
    })
  }

  onChangeClickButton = (e) => {
    const button = e.currentTarget

    const isOpen = button.classList.toggle(this.stateClasses.isOpen)

    const myEvent = new CustomEvent('isButtonOpen', {
      bubbles: true,
      cancelable: true,
      detail: {
        isOpen: isOpen,
        button: button,
      },
    })

    button.dispatchEvent(myEvent)
  }
}

export default CollapseButton
