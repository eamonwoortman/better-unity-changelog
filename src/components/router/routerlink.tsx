import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

// Default settings
const defaultNormalColor = 'text-gray-200'
const defaultActiveColor = 'text-blue-500'

function RouterLink({ href, normalColor = defaultNormalColor, activeColor = defaultActiveColor, children }) {
  const router = useRouter()
  let className = children.props.className || ''

  if (router.pathname === href) {
    className = `${className} ${activeColor}`
  } else {
    className = `${className} ${normalColor}`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

export default RouterLink
