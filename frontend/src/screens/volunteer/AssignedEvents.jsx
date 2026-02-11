import React from 'react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import EventCard from '../../components/volunteer/EventCard'

const AssignedEvents = () => {
  return (
    <div className=' p-10'>
      <div className=' flex flex-col gap-3'>
        <h2 className='font-black text-3xl'>Welcome Back, <span>name</span>! </h2>
        <p className='text-gray-500 text-sm'>You have <span className='text-blue-800 font-semibold'>3 assigned events</span> today. Select an event below to begin managing check-ins ans accessing scanner tools </p>
        <div className='mt-4 bg-white border border-gray-200 rounded-2xl px-4 py-2 flex items-center justify-between shadow-sm'>
            <div className='flex items-center gap-3 flex-1 max-w-md'>
                <FaSearch className='text-gray-400 text-sm' />
                <input
                    type="text"
                    placeholder='Search event by name or location...'
                    className='flex-1 bg-transparent outline-none text-sm placeholder-gray-400'
                />
            </div>

            <div className='flex gap-2'>
                <button className='px-4 py-1.5 bg-blue-700 text-white text-sm rounded-lg'>
                All Events
                </button>
                <button className='px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200'>
                Active Now
                </button>
                <button className='px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200'>
                Upcoming
                </button>
            </div>
        </div>

      </div>
      <div className='grid grid-cols-4 gap-5 my-8'>
        <EventCard/>
        <EventCard/>
      </div>
    </div>
  )
}

export default AssignedEvents
