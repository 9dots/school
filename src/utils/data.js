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
    label: 'Computer Science',
    id: 'f399cd50-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'computer-science'
  },
  {
    label: 'Javascript',
    id: 'f399f460-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'javascript'
  },
  {
    label: 'World Languages',
    id: 'f399f461-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'world-languages'
  },
  {
    label: 'Social Studies',
    id: 'f399f462-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'social-studies'
  },
  {
    label: 'Science',
    id: 'f399f463-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'science'
  },
  {
    label: 'Mathematics',
    id: 'f399f464-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'mathematics'
  },
  {
    label: 'Language Arts',
    id: 'f399f465-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'language-arts'
  },
  {
    label: 'Creative Arts',
    id: 'f399f466-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'creative-arts'
  },
  {
    label: 'Professional Development',
    id: 'f399f467-3e7c-11e8-949b-c5a74b9c23b2',
    slug: 'professional-development'
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
    label: 'Link',
    icon: 'link',
    value: 'link',
    id: 'link'
  },
  {
    label: 'Listen',
    icon: 'sound',
    value: 'listen',
    id: 'listen'
  },
  {
    label: 'Writing',
    icon: 'edit',
    value: 'write',
    id: 'write'
  },
  {
    label: 'Video',
    icon: 'video-camera',
    value: 'video',
    id: 'video'
  },
  {
    label: 'Assignment',
    icon: 'file-text',
    value: 'assignment',
    id: 'assignment'
  },
  {
    label: 'Test',
    icon: 'profile',
    value: 'test',
    id: 'test'
  }
]

const typeMap = { difficulty, grades, tags, taskTypes }

// Takes an array of grade values and returns a grade range e.g. "K - 2nd"
const gradesToText = function (grades) {
  const arr = [].concat(grades)
  const max = idsToText('grades', Math.max(...arr)).join()
  const min = idsToText('grades', Math.min(...arr)).join()

  if (max === min) return max
  else return `${min === 'Kindergarten' ? 'K' : min} - ${max}`
}

const getTaskIcon = function (val) {
  return (taskTypes.find(type => type.value === val) || {}).icon
}

const idsToText = function (dataType, ids) {
  return [].concat(ids).map(id => {
    return typeMap[dataType].find(val => val.id === id).label
  })
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
