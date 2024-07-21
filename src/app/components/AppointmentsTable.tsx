// components/AppointmentsTable.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { fetchData, Data } from '../lib/fetchData';

interface AppointmentsTableProps {
  doctorId: string;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ doctorId }) => {
  const [appointments, setAppointments] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchData(doctorId);
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [doctorId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return { color: 'red', border: '1px solid red', padding: '0.5rem' };
      case 'Completed':
        return { color: 'green', border: '1px solid green', padding: '0.5rem' };
      case 'Upcoming':
        return { color: 'blue', border: '1px solid blue', padding: '0.5rem' };
      default:
        return {};
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Image</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Name</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Date</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Time</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Method</th>
          <th style={{ textAlign: 'left', paddingRight: '2rem' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td style={{ paddingRight: '2rem' }}><img src={appointment.image} alt={appointment.name} width={70} height={70} /></td>
            <td style={{ paddingRight: '2rem' }}>{appointment.name}</td>
            <td style={{ paddingRight: '2rem' }}>{appointment.date}</td>
            <td style={{ paddingRight: '2rem' }}>{appointment.time}</td>
            <td style={{ paddingRight: '2rem' }}>{appointment.package}</td>
            <td style={{ paddingRight: '2rem' }}>
            <span style={getStatusStyle(appointment.status)}>
                {appointment.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentsTable;
