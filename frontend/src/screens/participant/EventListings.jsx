import React from 'react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import EventCard from '../../components/participant/EventCard'

const EventListings = () => {
  return (
    <div className=' p-10'>
      <div className=' flex flex-col gap-3'>
        <h2 className='font-black text-3xl'>Explore Events</h2>
        <p className='text-gray-500 text-sm'>Discover workshops, hackathons, and seminars tailored for you.</p>
        <div className=' border rounded-xl px-2 py-1 flex items-center mt-2 gap-2'>
            <FaSearch className='text-blue-800'/>
            <input
            className='flex-1'
             type="text" placeholder='Search for hackathons, workshops, coding challenges...'/>
            <div className='p-2 bg-blue-800 rounded'><FaArrowRight className='text-white'/></div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-5 my-8'>
        <EventCard/>
        <EventCard/>
      </div>
    </div>
  )
}

export default EventListings
