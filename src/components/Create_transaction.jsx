import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wallet from '../assets/wallet-glyph-style-blue-colour 1.png'

const CreateTransactions = () => {
  const navigate=useNavigate()
  return (
    <div className="flex  pt-20 ">
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header on top */}
        

        {/* Page Content */}
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className='flex justify-center items-center mb-4'>
              <img className='w-30 h-30' src={Wallet} alt="wallet" />
            </div>
            <div className='flex flex-row justify-center'>
              <p>“Looks a little empty here”</p>
              <img src="src/assets/eyes.png" alt="an eye image" />
            </div>
            <p className="text-gray-500 mb-6">
              Add your first transaction to get things rolling
            </p>
            <button onClick={()=>navigate('/transactions/add')} className="bg-[#0A3594] text-white px-5 py-2 rounded-md hover:bg-blue-800 transition font-extrabold">
              + Let's Add One
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateTransactions