import React from 'react'

export const Button = (props) => {
    const {children, buttonText, func} = props
    return (
    <>
    <button onClick={func} className='w-fit mx-auto px-8 py-4 rounded-md border-[2px] border-blue-400 border-solid blueShadow duration-200 transition'>
        <p>{buttonText}</p>
        {children && <div>
          {children}
        </div>}
      </button>
    </>
  )
}