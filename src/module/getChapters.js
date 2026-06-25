import { getCollection } from 'astro:content'

export async function getChapters(options = {}) {
  const lessonsCollection = await getCollection('lessons')
  const chaptersMap = new Map()

  lessonsCollection.forEach((lesson) => {
    const chapterName = lesson.data.chapter
    if (!chaptersMap.has(chapterName)) {
      chaptersMap.set(chapterName, [])
    }
    chaptersMap.get(chapterName).push(lesson)
  })

  const chapters = []

  chaptersMap.forEach((lessons, chapterTitle) => {
    const sortedLessons = lessons
      .sort((a, b) => a.data.order - b.data.order)
      .map((lesson) => ({
        label: lesson.data.title,
        href: `/PyStart/lessons/${lesson.id}/`,
        isActive: lesson.id === options.currentLessonId,
      }))

    chapters.push({
      title: chapterTitle,
      isOpen: sortedLessons.some((l) => l.isActive),
      lessons: sortedLessons,
    })
  })

  return chapters
}
