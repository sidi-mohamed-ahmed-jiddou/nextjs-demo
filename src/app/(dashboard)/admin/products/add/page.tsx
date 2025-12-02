import React from 'react'
import AddProductForm from '@/components/AddProductForm'

const page = () => {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-80px)] p-4'>
      <div className='w-full max-w-2xl'>
        <h1 className='text-2xl font-bold mb-4'>Add New Product</h1>
        <AddProductForm />
      </div>
    </div>
  )
}

export default page