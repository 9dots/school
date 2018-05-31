import React from 'react'

export default function getShape (index) {
  return (
    <svg key='circle' viewBox='-5 -5 205 205'>
      {index < 0 ? (
        <circle key='circle' cx='95' cy='95' r='95' />
      ) : (
        [
          <rect
            key='diamond'
            x='29.3'
            y='29.2'
            transform='matrix(0.7071 -0.7071 0.7071 0.7071 -41.3294 99.9619)'
            width='140'
            height='140' />,
          <polygon
            key='star'
            points='170,130 200,100 170,70 170,30 130,30 100,0 70,30 30,30 30,70 0,100 30,130 30,170 70,170 100,200 130,170 170,170 ' />,
          <rect key='square' x='15' y='15' width='170' height='170' />,
          <polygon
            key='triangle'
            style={{ marginTop: -1 }}
            points='0,165 200,165 100,0' />
        ][index % 4]
      )}
    </svg>
  )
}
