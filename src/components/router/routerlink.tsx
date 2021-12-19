import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// default settings
const defaultNormalColor = 'text-gray-200';
const defaultActiveColor = 'text-blue-500';

const RouterLink = ({ href, normalColor = defaultNormalColor, activeColor = defaultActiveColor, children }) => {
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