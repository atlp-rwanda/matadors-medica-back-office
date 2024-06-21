"use client"
import React, { useState } from 'react';
import Layout from '@/app/components/layout';
import Article from '@/app/components/Article';
import GlobalSearch from '@/app/components/search';
import Button from '@/app/components/button';
import Logo from '../../assets/images/Ellipse.png'; // Ensure this path is correct

const Appointment: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [recentAppointments] = useState<any[]>([
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5c8qTfL3AJWgcdjLX6fmLy52GweaioJDaXA&s', name: 'COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ791z56BFM5tx-cWNud7Oo_C0BqrhKQZ_lONxDoMI9dRO3k7pL5ZTn_ATN-Sx0YguOss&usqp=CAU', name: 'COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People', date: '12-08-2024', status: 'Pending' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s', name: 'COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5c8qTfL3AJWgcdjLX6fmLy52GweaioJDaXA&s', name: 'COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s', name: 'COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People', date: '12-08-2024', status: 'Review' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5c8qTfL3AJWgcdjLX6fmLy52GweaioJDaXA&s', name: 'COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People', date: '12-08-2024', status: 'Review' },
  ]);

  const handleSearch = (results: any[]) => {
    setFilteredAppointments(results);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredAppointments([]);
    } else {
      const filtered = recentAppointments.filter(appointment =>
        appointment.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  };

  return (
    <Layout>
      <GlobalSearch
        data={recentAppointments} // Pass your full data array here
        onSearch={handleSearch}
        onSearchQueryChange={handleSearchQueryChange} // Callback to handle query change
        searchFields={['name', 'date']} // Specify which fields to search
        placeholder="Search appointments..."
      />
      <div className='flex justify-between items-center py-7'>
        <h1 className='font-semibold text-2xl'>Articles</h1>
        <div className='w-[20%]'>
          <Button name='New Article' />
        </div>
      </div>
      <div className='grid lg:grid-cols-2 sm:grid-cols gap-3'>
        {(searchQuery.trim() === '' ? recentAppointments : filteredAppointments).map((appointment, index) => (
          <Article
            key={index}
            name={appointment.name}
            imageSrc={appointment.image}
            date={appointment.date}
            className='bg-white rounded-2xl p-2'
          >
            <div>
              <button className='bg-blue-200 text-blue-500 p-1 rounded-full'>Covid-19</button>
            </div>
          </Article>
        ))}
      </div>
    </Layout>
  );
};

export default Appointment;
