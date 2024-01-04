import Icon from '@/components/icon';
import { useState } from 'react';

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

export default ProfileItem;
