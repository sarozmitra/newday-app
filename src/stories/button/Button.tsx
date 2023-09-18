import React from 'react';
import clsx from 'clsx'
import style from './Button.module.css';

interface ButtonProps {
  /** Class name or array of class names that are applied to the control route */
  className?: string | string[]
  /** Sets the style of button */
  variant?: 'primary' | 'secondary' | 'tertiary'
  /**  How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Sets the type of button */
  type?: 'button' | 'submit' | 'reset'
  /** Action event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  /** Children is the text or content to be rendered */
  children: React.ReactNode
  /**  Pass a ref to the `button` element. */
  buttonRef?: React.Ref<any>
  /** Button Data Test Id for automation testing */
  dataTestIdPrefix?: string
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  type = 'button',
  children,
  className = '',
  buttonRef,
  dataTestIdPrefix = 'button',
  ...props
}: ButtonProps) => {

  const classNames = clsx([className], {
    [style.Button]: true,
    [style.primary]: variant === 'primary',
    [style.secondary]: variant === 'secondary',
    [style.tertiary]: variant === 'tertiary',
    [style.small]: size === 'small',
    [style.large]: size === 'large',
    [style.medium]: size === 'medium',
  });

  return (
    <button
      className={classNames}
      data-testid={`${dataTestIdPrefix}-${variant}`}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  );
};
