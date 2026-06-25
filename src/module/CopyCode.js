function CopyCode() {
  const codeBlocks = document.querySelectorAll('.astro-code')

  codeBlocks.forEach((preElement) => {
    const buttonElement = document.createElement('button')

    buttonElement.textContent = 'Copy'
    buttonElement.className = 'button button--black copy-code-button'
    buttonElement.type = 'button'
    preElement.appendChild(buttonElement)
  })

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.copy-code-button')
    if (!button) return

    const preElement = button.closest('pre')
    const codeElement = preElement?.querySelector('code')
    if (!codeElement) return

    try {
      await navigator.clipboard.writeText(codeElement.textContent)

      button.textContent = 'Скопировано'
      button.style.border = '1px solid var(--neon-green)'

      setTimeout(() => {
        button.textContent = 'Copy'
        button.style.border = ''
      }, 2000)
    } catch (err) {
      console.error('Не удалось скопировать код:', err)
      button.textContent = 'Не скопировано'
    }
  })
}

export default CopyCode
