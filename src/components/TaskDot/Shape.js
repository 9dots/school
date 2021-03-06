import React from 'react'
import { taskTypes } from 'utils/data'

const Shape = ({ shape }) => {
  const offset = 10
  const box = `${0 - offset} ${0 - offset} ${200 + offset * 2} ${200 +
    offset * 2}`

  const index = taskTypes.findIndex(({ value }) => value === shape)
  const i = index < 0 ? 0 : index

  return [
    <svg key='circle' viewBox={box}>
      <circle cx='100' cy='100' r='90' />
    </svg>,
    <svg key='diamond' viewBox={box}>
      <rect
        x='34'
        y='34'
        transform='matrix(0.7071 0.7071 -0.7071 0.7071 100 -41.4214)'
        width='135'
        height='135' />
    </svg>,
    <svg key='square' viewBox={box}>
      <rect x='20' y='20' width='160' height='160' />
    </svg>,
    <svg key='star' viewBox={box}>
      <polygon points='167.9,128.1 196,100 167.9,71.9 167.9,32.1 128.1,32.1 100,4 71.9,32.1 32.1,32.1 32.1,71.9 4,100 32.1,128.1  32.1,167.9 71.9,167.9 100,196 128.1,167.9 167.9,167.9 ' />
    </svg>,
    <svg key='flower' viewBox={box}>
      <path d='M182.1,84.2c5.3-13.5,3.5-29.5-6.2-41.7c-9.7-12.2-24.7-17.6-39.1-15.5C129.6,14.4,116,5.9,100.4,5.8 c-0.1,0-0.2,0-0.3,0c0,0,0,0,0,0c-15.6,0-29.2,8.5-36.5,21C49.2,24.7,34.1,30,24.3,42.2C14.6,54.4,12.7,70.3,18,83.9 c-10.6,9.9-15.9,25-12.4,40.2c3.4,15.2,14.7,26.6,28.6,31c1.1,14.5,9.7,28,23.7,34.8c14,6.8,30,5.1,42-3c7,4.8,15.3,7.3,23.8,7.3 c6.1,0,12.3-1.3,18.2-4.2c14-6.7,22.7-20.2,23.8-34.7c13.9-4.3,25.2-15.7,28.7-30.9C197.9,109.3,192.7,94.1,182.1,84.2z' />
    </svg>,
    <svg key='hexagon' viewBox={box}>
      <polygon points='146.2,20 53.8,20 7.6,100 53.8,180 146.2,180 192.4,100 ' />
    </svg>
  ][i % 6 || 0]
}

export default Shape
