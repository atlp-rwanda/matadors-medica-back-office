import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { FaPhoneAlt, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import ParticipantView from "./VideoCallParticipantView";

interface VideoCallUIProps {
  profilePicture: string;
  name: string;
  joinButtonIcon: React.ReactNode;
  microphoneButtonIcon: React.ReactNode;
  hangupButtonIcon: React.ReactNode;
  participants: string[];
  toggleMicrophone: () => void;
  handleHangup: () => void;
}

const VideoCallUI: React.FC<VideoCallUIProps> = ({
  profilePicture,
  name,
  joinButtonIcon,
  microphoneButtonIcon,
  hangupButtonIcon,
  participants,
  toggleMicrophone,
  handleHangup,
}) => {
  const { join, leave, toggleMic } = useMeeting({
    onMeetingJoined: () => {
      console.log("Meeting joined");
    },
    onMeetingLeft: () => {
      console.log("Meeting left");
    },
  });

  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = async () => {
    await join();
    setIsJoined(true);
  };

  const handleLeave = async () => {
    await leave();
    setIsJoined(false);
    handleHangup();
  };

  const handleMic = async () => {
    await toggleMic();
    toggleMicrophone();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="flex flex-col items-center justify-center w-full h-full bg-[#EEF4FF] rounded-lg shadow-lg p-4 mb-4">
        {participants.length > 0 ? (
          participants.map((participantId) => (
            <ParticipantView key={participantId} participantId={participantId} />
          ))
        ) : (
          <div className="text-black text-center">
            <p>No participants joined yet</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          onClick={isJoined ? handleLeave : handleJoin}
          className="bg-green-500 text-white p-4 rounded-full mx-2"
        >
          {isJoined ? hangupButtonIcon : joinButtonIcon}
        </button>
        <button onClick={handleMic} className="bg-blue-500 text-white p-4 rounded-full mx-2">
          {microphoneButtonIcon}
        </button>
      </div>
    </div>
  );
};

export default VideoCallUI;
