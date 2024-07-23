import { supabase } from '../utils/supabase/client';

export type Data = {
  id: string;
  image: string;
  name: string;
  date: string;
  status: string;
  package: string;
  time: string;
  gender: string;
  age: number;
  // illness_decr: string;
};


// const formatDate = (dateTime: string): string => {
//   const date = new Date(dateTime);
//   return date.toISOString().split('T')[0];
// };
export const fetchAppointmentDetail = async (appointmentId: string): Promise<Data> => {
  const response = await fetch(`/api/appointments/${appointmentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch appointment details');
  }
  return response.json();
};

export const fetchData = async (doctorId: string): Promise<Data[]> => {
  const { data, error } = await supabase
    .from('appointment')
    .select(`
      id,
      date,
      status,
      time,
      package,
      patients (
        first_name,
        last_name,
        image,
        age,
        gender
      )
    `)
    .eq('doctor_id', doctorId)
    .eq('status', 'Upcoming');

  if (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message);
  }

  if (!data) {
    console.error("No data returned");
    return [];
  }

  const items = data.map((appointment: any) => ({
    id: appointment.id,
    image: appointment.patients.image,
    name: appointment.patients.first_name +" "+ appointment.patients.last_name,
    date: appointment.date,
    time: appointment.time,
    package: appointment.package,
    status: appointment.status,
    gender: appointment.patients.gender,
    age: appointment.patients.age,
    // illness_decr: appointment.illness_decr
  }));
  return items;
};
