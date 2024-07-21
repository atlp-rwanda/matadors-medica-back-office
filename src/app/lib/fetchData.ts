import { supabase } from '../utils/supabase/client';

export type Data = {
  id: string;
  image: string;
  name: string;
  date: string;
  status: string;
  package: string;
  time: string;
};


// const formatDate = (dateTime: string): string => {
//   const date = new Date(dateTime);
//   return date.toISOString().split('T')[0];
// };

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
        image
      )
    `)
    .eq('doctor_id', doctorId);

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
  }));
  return items;
};
