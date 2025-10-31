import React from 'react'
const generateMetadata = () => {
  return {
    title: "Sub Categories",
    description: "Manage your sub categories here"
  }
}

export {generateMetadata}

const subCatlayout = ({children}) => {
  return (
    <>
    {children}
    </>
  )
}

export default subCatlayout