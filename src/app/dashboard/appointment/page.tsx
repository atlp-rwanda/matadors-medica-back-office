// pages/appointments.tsx
"use client";

import React from 'react';
import AppointmentsTable from '@/app/components/AppointmentsTable';
import Layout from '@/app/components/layout';

const AppointmentsPage: React.FC = () => {
  // const doctorId = '017d4a3a-ae9c-4493-bbe1-8e80a577d14d';

  return (
      <Layout>
   <div>
      <h1 className="text-3xl font-bold">Appointments</h1>
      <p className="mt-4">Here you can manage your appointments.</p>
      <AppointmentsTable doctorId={'15f13424-9ae4-45e5-9750-3651c4058887'} />
    </div>
    </Layout>
  );
};

export default AppointmentsPage;
