import React from 'react'

function BatchesIcon({ size = 24 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 21h10a2 2 0 0 0 2-2V9.49a1 1 0 0 0-.29-.71l-5.7-5.7a1 1 0 0 0-.71-.29H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 9.3V9a2 2 0 0 0-2-2h-4.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  

export default BatchesIcon