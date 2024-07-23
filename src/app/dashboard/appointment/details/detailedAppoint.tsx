// pages/dashboard/appointment.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/app/components/layout';
import { FaComment } from 'react-icons/fa';
import { fetchAppointmentDetail, Data } from '../../../lib/fetchData'

const AppointmentDetails: React.FC = () => {
    const [appointment, setAppointment] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query; // Assuming `id` is the query parameter for appointment ID

    useEffect(() => {
        if (id) {
            const getAppointmentDetail = async () => {
                try {
                    const data = await fetchAppointmentDetail(id as string);
                    setAppointment(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            getAppointmentDetail();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!appointment) {
        return <p>No appointment found</p>;
    }

    return (
        <Layout>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <div className="flex items-center mb-8">
                    <img
                        src={appointment.image}
                        alt={appointment.name}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{appointment.name}</h2>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Scheduled Appointment</h3>
                    <p>{appointment.date}</p>
                    <p>{appointment.time} (30 minutes)</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Patient Information</h3>
                    <p><strong>Full Name:</strong> {appointment.name}</p>
                    <p><strong>Gender:</strong> {appointment.gender}</p>
                    <p><strong>Age:</strong> {appointment.age}</p>
                    {/* <p><strong>Problem:</strong> {appointment.illness_decr}</p> */}
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">Your Package</h3>
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center">
                            <div className="bg-blue-500 p-2 rounded-full text-white mr-4">
                                <FaComment />
                            </div>
                            <div>
                                <p className="font-semibold">{appointment.package}</p>
                                <p className="text-sm text-gray-500">Chat messages with doctor</p>
                            </div>
                        </div>
                        <p className="font-semibold">$20</p> {/* Adjust based on your actual package data */}
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Approve</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                </div>
            </div>
        </Layout>
    );
};

export default AppointmentDetails;











// // pages/dashboard/appointment.tsx

// "use client";
// import React from 'react';
// import Layout from '@/app/components/layout';
// import { FaComment } from 'react-icons/fa';

// const Appointment: React.FC = () => {
//     return (
//         <Layout>
//             <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
//                 <div className="flex items-center mb-8">
//                     <img
//                         src="/path/to/image.jpg"
//                         alt="Annabel Rohan"
//                         className="w-16 h-16 rounded-full mr-4"
//                     />
//                     <div>
//                         <h2 className="text-2xl font-bold">Annabel Rohan</h2>
//                     </div>
//                 </div>
//                 <div className="mb-8">
//                     <h3 className="text-lg font-semibold">Scheduled Appointment</h3>
//                     <p>Today, December 22, 2022</p>
//                     <p>16:00 - 16:30 PM (30 minutes)</p>
//                 </div>
//                 <div className="mb-8">
//                     <h3 className="text-lg font-semibold">Patient Information</h3>
//                     <p><strong>Full Name:</strong> Andrew Ainsley</p>
//                     <p><strong>Gender:</strong> Male</p>
//                     <p><strong>Age:</strong> 27</p>
//                     <p><strong>Problem:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
//                 </div>
//                 <div className="mb-8">
//                     <h3 className="text-lg font-semibold">Your Package</h3>
//                     <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
//                         <div className="flex items-center">
//                             <div className="bg-blue-500 p-2 rounded-full text-white mr-4">
//                                 <FaComment />
//                             </div>
//                             <div>
//                                 <p className="font-semibold">Messaging</p>
//                                 <p className="text-sm text-gray-500">Chat messages with doctor</p>
//                             </div>
//                         </div>
//                         <p className="font-semibold">$20</p>
//                     </div>
//                 </div>
//                 <div className="flex justify-between">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Approve</button>
//                     <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Appointment;
