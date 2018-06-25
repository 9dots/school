const grades = [
  {
    label: 'Kindergarten',
    value: 0,
    id: 0
  },
  {
    label: '1st',
    value: 1,
    id: 1
  },
  {
    label: '2nd',
    value: 2,
    id: 2
  },
  {
    label: '3rd',
    value: 3,
    id: 3
  },
  {
    label: '4th',
    value: 4,
    id: 4
  },
  {
    label: '5th',
    value: 5,
    id: 5
  },
  {
    label: '6th',
    value: 6,
    id: 6
  },
  {
    label: '7th',
    value: 7,
    id: 7
  },
  {
    label: '8th',
    value: 8,
    id: 8
  },
  {
    label: '9th',
    value: 9,
    id: 9
  },
  {
    label: '10th',
    value: 10,
    id: 10
  },
  {
    label: '11th',
    value: 11,
    id: 11
  },
  {
    label: '12th',
    value: 12,
    id: 12
  },
  {
    label: 'Higher Education',
    value: 13,
    id: 13
  },
  {
    label: 'Professional Development',
    value: 14,
    id: 14
  }
]

const tags = [
  {
    label: 'PixelBots',
    id: 'f8624290-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'pixelbots'
  },
  {
    label: 'Scratch',
    id: 'f8624291-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'scratch'
  },
  { label: 'p5', id: 'f8624292-78ab-11e8-8d23-9b54f4ddd993', slug: 'p5' },
  {
    label: 'Block-based code',
    id: 'f8624293-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'block-based-code'
  },
  {
    label: 'JavaScript',
    id: 'f8624294-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'javascript'
  },
  {
    label: 'Digital literacy',
    id: 'f8624295-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'digital-literacy'
  },
  {
    label: 'Decomposition',
    id: 'f8624296-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'decomposition'
  },
  {
    label: 'Algorithms',
    id: 'f8624297-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'algorithms'
  },
  {
    label: 'Abstraction',
    id: 'f8624298-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'abstraction'
  },
  {
    label: 'Control',
    id: 'f8624299-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'control'
  },
  {
    label: 'Sequencing',
    id: 'f862429a-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'sequencing'
  },
  {
    label: 'Patterns',
    id: 'f862429b-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'patterns'
  },
  {
    label: 'Arguments',
    id: 'f862429c-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'arguments'
  },
  { label: 'Loops', id: 'f862429d-78ab-11e8-8d23-9b54f4ddd993', slug: 'loops' },
  {
    label: 'Pixel Art',
    id: 'f862429e-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'pixel-art'
  },
  {
    label: 'Functions',
    id: 'f862429f-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'functions'
  },
  {
    label: 'Refactoring',
    id: 'f86242a0-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'refactoring'
  },
  {
    label: 'Conditionals',
    id: 'f86242a1-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'conditionals'
  },
  {
    label: 'User Experience',
    id: 'f86242a2-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'user-experience'
  },
  {
    label: 'Game Design',
    id: 'f86242a3-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'game-design'
  },
  {
    label: 'Parameters',
    id: 'f86242a4-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'parameters'
  },
  {
    label: 'Events',
    id: 'f86242a5-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'events'
  },
  {
    label: 'Operators',
    id: 'f86242a6-78ab-11e8-8d23-9b54f4ddd993',
    slug: 'operators'
  }
]

const difficulty = [
  {
    label: 'Level A',
    value: 0,
    id: 0
  },
  {
    label: 'Level B',
    value: 1,
    id: 1
  },
  {
    label: 'Level C',
    value: 2,
    id: 2
  },
  {
    label: 'Level D',
    value: 3,
    id: 3
  },
  {
    label: 'Level E',
    value: 4,
    id: 4
  }
]

const timeUnits = ['Minutes', 'Hours', 'Days', 'Weeks', 'Months']

const taskTypes = [
  {
    label: 'Practice',
    icon: 'edit',
    value: 'practice',
    id: 'practice'
  },
  {
    label: 'Review',
    icon: 'book',
    value: 'review',
    id: 'review'
  },
  {
    label: 'Extension',
    icon: 'file-add',
    value: 'extension',
    id: 'extension'
  },
  {
    label: 'Project',
    icon: 'rocket',
    value: 'project',
    id: 'project'
  },
  {
    label: 'Quiz / Survey',
    icon: 'profile',
    value: 'quiz',
    id: 'quiz'
  },
  {
    label: 'Media',
    icon: 'video-camera',
    value: 'media',
    id: 'media'
  }
]

const typeMap = { difficulty, grades, tags, taskTypes }

// Takes an array of grade values and returns a grade range e.g. "K - 2nd"
const gradesToText = function (grades) {
  const arr = [].concat(grades)
  const max = idsToText('grades', Math.max(...arr))
  const min = idsToText('grades', Math.min(...arr))

  if (max === min) return max
  else return `${min === 'Kindergarten' ? 'K' : min} - ${max}`
}

const getTaskIcon = function (val) {
  return (taskTypes.find(type => type.value === val) || {}).icon || 'edit'
}

const idsToText = function (dataType, ids) {
  return []
    .concat(ids)
    .map(id => {
      const item = typeMap[dataType].find(val => val.id === id) || {}
      return item.label || id
    })
    .join(', ')
}

export {
  gradesToText,
  getTaskIcon,
  difficulty,
  idsToText,
  timeUnits,
  taskTypes,
  grades,
  tags
}
