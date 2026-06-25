function ScrollSpy() {
  const headings = document.querySelectorAll('h2, h3, h4, h5, h6')
  const tocLinks = document.querySelectorAll('.content .links-list__link')
  const visibleHeadings = new Set()

  console.log(tocLinks)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target)
        } else {
          visibleHeadings.delete(entry.target)
        }
      })

      if (visibleHeadings.size > 0) {
        const activeHeading = Array.from(visibleHeadings)[0]
        const id = activeHeading.id

        tocLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`
          link.classList.toggle('content--active', isActive)
        })
      }
    },
    { rootMargin: '-150px 0px -80% 0px', threshold: 0 }
  )

  headings.forEach((h) => observer.observe(h))
}

export default ScrollSpy
