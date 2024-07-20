"use client";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
  CustomStyles,
  DefaultStreamChatGenerics,
} from 'stream-chat-react';
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/layout";
import 'stream-chat-react/dist/css/index.css';
import { StreamClient } from '@/app/utils/StreamChat/StreamClient';
import { useAuth } from '../../../../../ctx/AuthContext';
import { fetchDoctorData } from '@/app/utils/LoggedInUser';
import { DoctorsType } from '@/app/constants/type';
import { ChannelSort } from 'stream-chat';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const Appointment: React.FC = () => {

    const [doctorData, setDoctorData] = useState<DoctorsType[]>([]);
    const[streamConnected, setStreamConnected] = useState<boolean>(false);

    const { user } = useAuth();
 
    useEffect(() => {
        if (user && user?.id) {
          fetchDoctorData(user?.id, setDoctorData);
        }
      }, [user]);

      const userId = doctorData[0]?.id;

      const filters = { members: { $in:[userId] }, type: 'messaging' };
      const options = { presence: true, state: true };
      const sort : ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 } 

 

      useEffect(() => {
        const connectUserToStream = async () => {
          setStreamConnected(false);
          try {
            if (doctorData && Array.isArray(doctorData)) {
              const doctor = {
                id: doctorData[0]?.id,
                name: doctorData[0]?.first_name + " " + doctorData[0]?.last_name
                ,
                image: "https://i.imgur.com/fR9Jz14.png",
              };
    
              await StreamClient.connectUser(
                doctor,
                StreamClient.devToken(doctor?.id)
              );
              setStreamConnected(true);
            } else {
              setStreamConnected(false);
            }
          } catch (error) {
            setStreamConnected(false);
            console.log("error while connecting user", error);
          }
        };
        if (!StreamClient.userID) {
          connectUserToStream();
        }
      }, [doctorData, user]);

  return (
    <Layout>
      <Chat client={StreamClient }>
      <ChannelList 
      sort={sort} 
      filters={filters} 
       />
         <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
    </Layout>
  );
};

export default Appointment;
