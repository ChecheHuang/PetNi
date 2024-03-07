'use client'

import SimpleBarReact from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const SimpleBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleBarReact
      // autoHide={false}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </SimpleBarReact>
  )
}

export default SimpleBar
