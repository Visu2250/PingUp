import React from 'react'

const Loading = ({height='100vh'}) => {
  return (
    <div style={{height}} className='flex item-center justify-center h-screen'>
        <div className='w-10 h10 rounded-full border-3 border-purple-500 border-t-transparent animate-spin'>

        </div>
      
    </div>
  )
}

export default Loading
