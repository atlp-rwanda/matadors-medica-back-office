"use client";

import React, { useEffect, useState } from "react";
import VideoCallUI from "../../../components/VideoCallUI";
import { FaPhoneAlt, FaMicrophone, FaPhoneSlash, FaMicrophoneSlash } from "react-icons/fa";
import { supabase } from "@/app/utils/supabase/supabase"
import Image from "next/image";
import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "@/app/utils/VideoApi";
import myImage from '@/app/assets/images/Avatar.png';

interface Appointment {
  id: string;
  user_id: string;
  meetingId: string;
}

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
}

interface SelectedPatient {
  name: string;
  imageUrl: string | undefined;
  meetingId: string;
}

async function fetchAppointmentData(): Promise<Appointment[] | null> {
  const { data, error } = await supabase
    .from("appointment")
    .select("id, user_id, meetingId")
    .eq("package", "Video Call")
    .eq("status", "Upcoming");

  if (error) {
    console.error("Error fetching appointment data:", error);
    return null;
  }
  return data;
}

async function fetchUserData(userIds: string[]): Promise<Patient[] | null> {
  const bucketName = 'patients';

  const { data, error } = await supabase
    .from("patients")
    .select("id, first_name, last_name, image")
    .in("id", userIds);

  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }

  const transformedData = data.map((patient) => ({
    ...patient,
    image: `https://${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('https://', '')}/storage/v1/object/public/${bucketName}/${patient.image}`,
  }));

  return transformedData;
}

const VideoCallPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<SelectedPatient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isMicMuted, setIsMicMuted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentData = await fetchAppointmentData();
      if (appointmentData) {
        setAppointments(appointmentData);

        const userIds = appointmentData.map((appointment) => appointment.user_id);
        const userData = await fetchUserData(userIds);
        if (userData) {
          setPatients(userData);
        }
        
        const updatedAppointments = await Promise.all(
            appointmentData.map(async (appointment) => {
              if (!appointment.meetingId) {
                const meetingId = await handleCreateMeeting();
                return { ...appointment, meetingId };
              }
              return appointment;
            })
          );
  
          setAppointments(updatedAppointments);
      }
    };
    fetchData();
  }, []);

  const toggleMicrophone = () => {
    setIsMicMuted(!isMicMuted);
  };

  const handleHangup = async () => {
    if (selectedPatient) {
      const { error } = await supabase
        .from('appointment')
        .update({ status: 'Completed' })
        .eq('meetingId', selectedPatient.meetingId);

      if (error) {
        console.error("Error updating appointment status:", error);
      } else {
        setSelectedPatient(null);
      }
    }
  };

  const handleCreateMeeting = async () => {
    const meetingId = await createMeeting({ token: authToken });
    console.log('Created Meeting ID:', meetingId);
    return meetingId;
  };

  const handleJoinMeeting = async (meetingId: string) => {
    setSelectedPatient({
      name: "Doctor",
      imageUrl: "/profile-picture.png",
      meetingId,
    });
  };

  return (
      <div className="flex h-screen">
        <div className="bg-[#EEF4FF] w-1/3 p-4 rounded-lg overflow-auto">
          <h2 className="text-[#246BFD] font-bold mb-4">Patients</h2>
          <div>
            {appointments.map((appointment) => (
              <div key={appointment.id}>
                {patients.find((patient) => patient.id === appointment.user_id) && (
                  <div
                    className="flex cursor-pointer bg-white shadow-lg rounded-lg p-4 mb-4"
                    onClick={() =>
                      setSelectedPatient({
                        name: `${patients.find((patient) => patient.id === appointment.user_id)?.first_name} ${patients.find((patient) => patient.id === appointment.user_id)?.last_name}`,
                        imageUrl: patients.find((patient) => patient.id === appointment.user_id)?.image || "/profile-picture.png",
                        meetingId: appointment.meetingId,
                      })
                    }
                  >
                    <div>
                      <Image
                        src={patients.find((patient) => patient.id === appointment.user_id)?.image || "/profile-picture.png"}
                        alt="Patient Avatar"
                        width={64}
                        height={64}
                        priority
                        className="w-16 h-16 rounded-full mr-4"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,myImage"
                      />
                    </div>
                    <div>
                      <h3 className="text-[#246BFD] font-bold">
                        {patients.find((patient) => patient.id === appointment.user_id)?.first_name}{" "}
                        {patients.find((patient) => patient.id === appointment.user_id)?.last_name}
                      </h3>
                      <p className="text-gray-500">Patient</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3">
          {selectedPatient && (
            <MeetingProvider
              config={{
                meetingId: selectedPatient.meetingId,
                micEnabled: !isMicMuted,
                webcamEnabled: true,
                name: "Doctor",
              }}
              token={authToken}
            >
              <VideoCallWithParticipants
                profilePicture={selectedPatient.imageUrl || "/profile-picture.png"}
                name={selectedPatient.name || "No patient selected"}
                joinButtonIcon={<FaPhoneAlt />}
                microphoneButtonIcon={isMicMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                hangupButtonIcon={<FaPhoneSlash />}
                handleHangup={handleHangup}
                toggleMicrophone={toggleMicrophone}
              />
            </MeetingProvider>
          )}
        </div>
      </div>
  );
};

const VideoCallWithParticipants: React.FC<{ profilePicture: string; name: string; joinButtonIcon: JSX.Element; microphoneButtonIcon: JSX.Element; hangupButtonIcon: JSX.Element; handleHangup: () => void; toggleMicrophone: () => void; }> = (props) => {
  const { participants } = useMeeting();
  const participantIds = [...participants.keys()];

  return (
    <VideoCallUI {...props} participants={participantIds} />
  );
};

export default VideoCallPage;