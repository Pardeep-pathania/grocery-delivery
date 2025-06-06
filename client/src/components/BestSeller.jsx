import React from 'react'
import ProductCard from './ProductCard'

const BestSeller = () => {
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div>
        <ProductCard/>
      </div>
    </div>
  )
}

export default BestSeller
