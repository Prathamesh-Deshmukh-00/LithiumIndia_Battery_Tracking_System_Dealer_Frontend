import React from 'react'

function Loading() {
  return (
    <tr>
  <td colSpan="7" className="py-10 h-84">
    <div className="flex items-center justify-center gap-2 w-full text-green-600 text-lg">
      <svg
        className="animate-spin h-6 w-6 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
        ></path>
      </svg>
      <span className="font-medium">Loading...</span>
    </div>
  </td>
</tr>
  )
}

export default Loading;