'use client';
import React, { useState } from 'react';
import Icon from '../icon';
import Image from 'next/image';
import LeftModal from './left-modal';

const ProfileItem = ({
  property,
  handleChange
}: {
  property: string;
  handleChange: (value: string) => void;
}) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="flex flex-col gap-4 border-b border-slate-900">
      <span className="text-green-text">Your name</span>
      {isEditable ? (
        <div className="relative">
          <input
            value={property}
            type="text"
            maxLength={25}
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            className="w-full bg-transparent h-8 outline-none border-b-2 border-slate-500 focus:border-green-text"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center"
            onClick={() => {
              setIsEditable(false);
            }}>
            <Icon name="check" alt="Done!" />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <span>{property}</span>
          <div
            onClick={() => {
              setIsEditable(true);
            }}>
            <Icon name="pencil" alt="Change name" width={20} />
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileModal = () => {
  const [showPictureChanger, setShowPictureChanger] = useState(false);
  const [name, setName] = useState('Lucas');
  const [message, setMessage] = useState('.');
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
          <Image
            src="/profile.enc"
            alt="Profile picture"
            height={200}
            width={200}
            className="rounded-full w-48 h-48"
          />
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
