import React, { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

interface HeaderProps extends HTMLAttributes<HTMLAnchorElement> {
  title: string
  leftLink?: {
    label: string
    icon: any
    to: string
  }
  rightLink?: {
    label: string
    icon: any
    to: string
  }
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftLink,
  rightLink,
  ...props
}) => {
  return (
    <nav className="header">
      <div className="link left">
        {leftLink !== undefined && (
          <Link to={leftLink.to} {...props}>
            {leftLink.icon}
            <span>{leftLink.label}</span>
          </Link>
        )}
      </div>

      <h1>{title}</h1>

      <div className="link right">
        {rightLink !== undefined && (
          <Link to={rightLink.to} {...props}>
            <span>{rightLink.label}</span>
            {rightLink.icon}
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
