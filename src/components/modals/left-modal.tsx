import React, { type ReactNode } from 'react';
import { toggleModal, type ModalType } from '@/redux/features/modalSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSpring, animated } from 'react-spring';
import Icon from '../icon';

interface LeftModalProps {
  type: ModalType;
  title: string;
  children: ReactNode;
}

const LeftModal = ({ type, title, children }: LeftModalProps) => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.modalReducer[type]);

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)'
  });

  return (
    <animated.div
      style={animation}
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute top-1/2 left-1/2 bg-dark-level-3 w-full h-full`}>
      <div className="flex h-28 bg-dark-level-4 items-end p-3">
        <div
          className="flex items-center gap-4"
          onClick={() => dispatch(toggleModal(type))}>
          <Icon name="arrow-left" alt="Back" />
          <span className="text-lg text-slate-300 font-medium capitalize">
            {title}
          </span>
        </div>
      </div>
      {children}
    </animated.div>
  );
};

export default LeftModal;
