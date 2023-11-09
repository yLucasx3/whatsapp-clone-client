import React, { type CSSProperties } from 'react';
import { icons } from './icons';
import Image from 'next/image';

type IconType = keyof typeof icons;

interface IconProps {
  name: IconType;
  alt: string;
  className?: string;
  heigth?: number;
  width?: number;
  customStyle?: CSSProperties;
}

const Icon = ({
  name,
  alt,
  className,
  heigth,
  width,
  customStyle
}: IconProps) => {
  return (
    <div className="p-2 rounded-full active:bg-dark-level-3-opacity transition-all">
      <Image
        src={icons[name]}
        alt={alt}
        className={`${className} cursor-pointer`}
        height={heigth ?? 24}
        width={width ?? 24}
        style={customStyle}
      />
    </div>
  );
};

export default Icon;
