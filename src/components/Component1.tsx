import React from 'react'

const Component1 = ({children}:{children:React.ReactNode}) => {
  return (
    <div style={{
        border:'2px solid red',
        padding:'10px 20px'
    }}>

        <h1>COMPONENT 1</h1>

        <div style={{
        border:'2px solid blue',
        padding:'10px 20px'
    }}>
            {children}
        </div>
    </div>
  )
}

export default Component1