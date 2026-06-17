/** @type {import('stylelint').Config} */
export default {
  // Наследование готовых наборов правил
  extends: [
    'stylelint-config-standard-scss', // Стандартные правила для SCSS
    'stylelint-config-recess-order'   // Сортировка свойств (по методологии Recess/Bootstrap)
  ],
  // Указание парсеров для нестандартных расширений файлов
  overrides: [
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  // Пользовательские исключения и настройки правил
  rules: {
    // Селектор BEM: поддерживает стандартный BEM, а также утилиты .is-*, .js-*, .no-*
    'selector-class-pattern': [
      '^(^[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$)|(^(is|js|no)-[a-z0-9]+(-[a-z0-9]+)*$)',
      {
        severity: 'error',
        message: 'Класс должен соответствовать BEM (block__elem--mod) или быть системным флагом (.is-active, .js-click)'
      }
    ],

    // Отключаем требование о дублировании селекторов для улучшения структуры BEM в SCSS
    'no-descending-specificity': null,

    // Разрешаем пустые блоки правил (например, для заготовок классов)
    'block-no-empty': null,

    // Разрешаем склеивание BEM-классов через амперсанд (&__element)
    'scss/selector-no-union-class-name': null,

    // Ограничиваем максимальный уровень вложенности в SCSS
    'max-nesting-depth': [
      4,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes']
      }
    ],
  },
  // Исключаемые папки
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    '.astro/**/*'
  ]
}
