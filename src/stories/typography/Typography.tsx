import React from 'react';
import clsx from 'clsx'
import style from './Typography.module.css';

type TypographyAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

export interface TypographyProps {
  /** Class name or array of class names that are applied to the control route */
  className?: string | string[]
  id?: string
  /** Variant is pre-defined list of html tags for typography component */
  variant?: TypographyAs;
  /** As is a tag, Component that can be used instead of normal typography tag such as div or Link  */
  as?: TypographyAs;
  /** Children is the text or content to be rendered */
  children: React.ReactNode;
  /** StrikeThrough Text */
  strikeThrough?: boolean;
  /** Alignment of the Text is decided by the below. default to left align text */
  align?: 'left' | 'right' | 'center' | 'justify';
  /** If the component has bottom margin or not. default to false */
  noGutter?: boolean;
  /** Set aria Label for Typography */
  ariaLabel?: string;
  /** Typography Data Test Id for automation testing */
  dataTestIdPrefix?: string
}

export const Typography: React.FC<TypographyProps> = ({
  className = '',
  variant,
  as,
  children,
  strikeThrough = false,
  align,
  noGutter = false,
  ariaLabel,
  dataTestIdPrefix = 'typography',
}) => {

  const classNames = clsx([className], {
    [style.Typography]: true,
    [style.noGutter]: noGutter,
    [style.left]: align === 'left',
    [style.right]: align === 'right',
    [style.center]: align === 'center',
    [style.justify]: align === 'justify',
    [style.strikeThrough]: strikeThrough,
  }, [variant]);

  const Component = as || variant || 'p';

  return (
    <Component className={classNames} data-testid={`${dataTestIdPrefix}-${variant || as}`} aria-label={ariaLabel}>
      {children}
    </Component>
  );
};
