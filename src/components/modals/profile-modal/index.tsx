'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ProfileItem from './profile-item';
import LeftModal from '../left-modal';
import Icon from '@/components/icon';

const ProfileModal = () => {
  const [showPictureChanger, setShowPictureChanger] = useState(false);
  const [name, setName] = useState('Lucas');
  const [message, setMessage] = useState('.');

  const { data: session } = useSession();

  return (
    <LeftModal type="profile" title="Profile">
      <div className="flex flex-col items-center py-6 text-slate-200">
        <div
          className="relative"
          onMouseLeave={() => {
            setShowPictureChanger(false);
          }}
          onMouseOver={() => {
            setShowPictureChanger(true);
          }}>
          {session && session.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile picture"
              height={200}
              width={200}
              className="rounded-full w-48 h-48"
            />
          )}
          {showPictureChanger && (
            <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-48 h-48 rounded-full bg-dark-level-3-opacity text-slate-300 cursor-pointer">
              <Icon name="camera" alt="Camera" />
              <span className="text-sm uppercase">Change profile</span>
              <span className="text-sm uppercase">photo</span>
            </div>
          )}
        </div>
        <div className="flex flex-col px-7 gap-4">
          <ProfileItem property={name} handleChange={setName} />

          <span className="text-sm text-slate-400 my-4 border-b border-slate-900">
            This is not your username nor your PIN, this name will be displayed
            to your friends on Whatsapp.
          </span>

          <ProfileItem property={message} handleChange={setMessage} />
        </div>
      </div>
    </LeftModal>
  );
};

export default ProfileModal;
