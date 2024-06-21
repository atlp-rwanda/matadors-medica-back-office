"use client";
import Layout from '@/app/components/layout';
import React, { useState, useEffect } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';
import GlobalSearch from '@/app/components/search';
import Card from '@/app/components/cards';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [filtermenu, setFilterMenu] = useState<any[]>([])

  const recentAppointments = [
    { image: 'https://americanhatmakers.com/cdn/shop/files/Hollywood-Copper-Leather-Cowboy-Hat-Mens-FW23-American-Hat-Makers_1.webp?v=1715028775&width=1000', name: 'Annabel Rohan', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s', name: 'Geoffrey Mott', date: '12-08-2024', status: 'Pending' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s', name: 'Rayford Chenail', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s', name: 'John Doe', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s', name: 'John Doe', date: '12-08-2024', status: 'Review' },
  ];

  const otherAppointments = [
    {
      name: 'Foden Scott',
      call: 'Video call',
      image: 'https://www.realmenrealstyle.com/wp-content/uploads/2023/08/Kinky-Hair.jpg',
      date: '12-08-2024',
      status: 'Review'
    },
    {
      name: 'Amin Adidi',
      call: 'Messaging',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s',
      date: '12-08-2024',
      status: 'Pending'
    },
  ];

  const allAppointments = [...recentAppointments, ...otherAppointments];

  const handleSearch = (results: any[]) => {
    setFilteredAppointments(results);
  };

  return (
    <Layout>
      <div>
        <GlobalSearch
          data={allAppointments}
          onSearch={handleSearch}
          placeholder="Search appointments..."
          searchFields={['name', 'date']}
        />
        <div className="mb-10">
          <h1 className="text-xl text-[#757575] font-bold">Good Morning 👋</h1>
          <h2 className="text-3xl mt-2 text-black">Dr. Drake Boeson</h2>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols gap-6 mb-10 text-black">
          <Card name='Message' countx="30" icon={<ForumIcon className='text-white text-4xl' />} className="bg-[#246BFD] flex justify-center flex-col items-center gap-5 text-white p-5 shadow rounded-lg"/>
          <Card name='Voice Call' countx="20"  icon={<VideocamIcon className='text-white text-4xl' />} className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg"  />
          <Card name='Video Call' countx="10"  icon={<VideocamIcon className='text-white text-4xl' />} className="bg-[#246BFD] flex justify-center items-center gap-5 text-white p-5 shadow rounded-lg" />
        
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols gap-6 text-black">
          <div>
            <div className="bg-white p-5 shadow rounded-lg mb-4">
              <div className='flex justify-between'>
                <h3 className="text-xl font-semibold mb-4">Today's Appointment</h3>
                <h3 className="text-xl font-semibold mb-4 text-[#5089FD]">See All</h3>
              </div>
              {otherAppointments.map((others, index) => (
                <div key={index} className='py-3 border-b flex items-center justify-between'>
                  <div className='flex gap-4'>
                    <img src={others.image} alt="gr" className='w-[45px] h-[45px] rounded-full' />
                    <p className="text-lg flex flex-col">{others.name} <span>{others.call}</span> </p>
                  </div>
                  <div className='bg-blue-200 p-2 rounded-full cursor-pointer'>
                    <ChevronRightIcon className='bg-blue-500 rounded-full text-md text-white' />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <div className='flex justify-between'>
                <h3 className="text-xl font-semibold mb-4">Pending's Appointment</h3>
                <h3 className="text-xl font-semibold mb-4 text-[#5089FD]">See All</h3>
              </div>
              {otherAppointments.map((others, index) => (
                <div key={index} className='py-3 border-b flex items-center justify-between'>
                  <div className='flex gap-4'>
                    <img src={others.image} alt="gr" className='w-[45px] h-[45px] rounded-full' />
                    <p className="text-lg flex flex-col">{others.name} <span>{others.call}</span> </p>
                  </div>
                  <div className='bg-blue-200 p-2 rounded-full cursor-pointer'>
                    <ChevronRightIcon className='bg-blue-500 rounded-full text-md text-white' />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white p-5 shadow rounded-lg mb-4">
              <div className='flex justify-between'>
                <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
                <h3 className="text-xl font-semibold mb-4 text-[#5089FD]">See All</h3>
              </div>
              {filteredAppointments.map((appointment, index) => (
                <div key={index} className='py-3 border-b flex justify-between'>
                  <div className='flex gap-4'>
                    <img src={appointment.image} alt="gr" className='w-[45px] h-[45px] rounded-full' />
                    <p className="text-lg flex flex-col">{appointment.name} <span>{appointment.date}</span> </p>
                  </div>
                  <div className='flex items-center'>
                    {appointment.status === 'Pending' ? (
                      <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded">Pending</button>
                    ) : (
                      <button className="border border-green-500 text-green-500 px-3 py-1 rounded">Review</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
