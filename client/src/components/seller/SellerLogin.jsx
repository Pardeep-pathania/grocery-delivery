import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {

    const {isSeller, setIsSeller, navigate} = useAppContext()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = async(event)=>{
        event.preventDefault();
        setIsSeller(true)
    }

    useEffect(()=>{
        if(isSeller){
            navigate('/seller')
        }
    },[isSeller])

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
        <div >
            <p className='text-2xl font-medium m-auto'>
                <span className='text-green-700'>Seller</span> Login
            </p>
        </div>
      
    </form>
  )
}

export default SellerLogin
