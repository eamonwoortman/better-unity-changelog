import React from 'react'

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
}

function Heading({ type = 'h1', children, ...props }) {
  return React.createElement(
    elements[type] || elements.h1,
    props,
    children
  )
}

export default Heading
