import React from 'react'
import { useParams } from 'react-router-dom'

export default function CarDetails() 
{
  const {carid}=useParams()
  return (
    <div>CarDetails   
      {carid}
    </div>
  )
}
