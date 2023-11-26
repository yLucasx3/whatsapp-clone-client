import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

export interface Action {
  name: string;
  handleSelect: () => void;
}

interface MultActionProps {
  actions: Action[];
}

const MultActions = ({ actions }: MultActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = (e: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closePopover);
    } else {
      document.removeEventListener('mousedown', closePopover);
    }

    return () => {
      document.removeEventListener('mousedown', closePopover);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div
        onClick={() => {
          togglePopover();
        }}>
        <Icon name="options" alt="More Options" />
      </div>
      {isOpen && (
        <div className="flex flex-col z-50 absolute top-10 right-0 w-60 py-2 rounded-md bg-dark-level-2 text-slate-300 shadow-inner">
          {actions.map((action) => (
            <span
              key={action.name}
              className="px-6 py-3 cursor-pointer hover:bg-dark-level-3-opacity text-sm text-slate-300">
              {action.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultActions;
