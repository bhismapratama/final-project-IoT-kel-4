import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'danger',
  'warning',
  'success',
  'label',
  'outline-primary',
  'outline-danger',
  'outline-warning',
  'outline-success',
  'none',
}
enum ButtonSize {
  'sm',
  'base',
  'lg',
}

type IconButtonProps = {
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  icon?: IconType;
  iconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'label',
      disabled: buttonDisabled,
      iconClassName,
      size = 'base',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={clsxm(
          'button inline-flex items-center justify-center',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition duration-100',
          'min-h-[28px] min-w-[28px] rounded-lg p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
          'text-black-500 text-sm md:text-base',

          //*=========== Size ===========
          [
            size === 'lg' && [
              'text-base md:text-lg min-h-[28px] min-w-[28px] p-2 md:min-h-[48px] md:min-w-[48px] md:p-2.5',
            ],
            size === 'base' && [
              'text-sm md:text-base min-h-[24px] min-w-[24px] p-1 md:min-h-[40px] md:min-w-[40px] md:p-1.5',
            ],
            size === 'sm' && [
              'text-xs md:text-sm min-h-[22px] min-w-[22px] p-[0.5px] md:min-h-[36px] md:min-w-[36px] md:p-1',
            ],
          ],
          //*======== Size ===========
          //*=========== Variant ===========
          [
            variant === 'primary' && [
              'text-white-500',
              'bg-blue-500',
              'hover:bg-blue-600',
              'active:bg-blue-700 active:border-white active:text-white',
              'shadow-blue-100 hover:shadow-blue-200 hover:shadow-40 disabled:hover:shadow-blue-100',
              'disabled:bg-blue-300 disabled:brightness-90 disabled:hover:bg-blue-300',
            ],
            variant === 'warning' && [
              'text-white-500',
              'bg-yellow-500',
              'hover:bg-yellow-600 hover:shadow-yellow-200 hover:shadow-40 active:bg-yellow-700 active:border-white active:text-white',
              'disabled:bg-yellow-300 disabled:brightness-95',
            ],
            variant === 'danger' && [
              'text-white-500',
              'bg-red-500',
              'shadow-red-100 hover:shadow-red-200 hover:shadow-40 disabled:hover:shadow-red-100',
              'hover:bg-red-600 active:bg-red-700 active:border-white active:text-white',
              'disabled:bg-red-300 disabled:brightness-95',
            ],
            variant === 'success' && [
              'text-white-500',
              'bg-green-500',
              'hover:bg-green-600 hover:shadow-40',
              'active:bg-green-700 active:border-white active:text-white',
              'shadow-green-100 hover:shadow-green-200 disabled:hover:shadow-green-100',
              'disabled:bg-green-300 disabled:brightness-95',
            ],
            variant === 'label' && [
              'bg-typo-white',
              'ring-2 ring-typo-outline',
              'hover:bg-typo-label hover:text-typo-white active:bg-typo-label',
              'active:bg-typo-label disabled:bg-typo-label disabled:text-white-500 disabled:brightness-95',
            ],
            variant === 'outline-primary' && [
              'text-blue-600 fill-blue-600',
              'bg-transparent',
              'border border-blue-500',
              'active:border-white active:text-white',
              'shadow-blue-100 hover:shadow-blue-200 hover:shadow-40 disabled:hover:shadow-blue-100',
              'disabled:bg-blue-700 disabled:brightness-90 disabled:hover:bg-blue-700',
            ],
            variant === 'outline-success' && [
              'text-green-600',
              'bg-transparent',
              'border border-green-600',
              'active:border-white active:text-white',
              'shadow-green-100 hover:shadow-green-200 hover:shadow-40 disabled:hover:shadow-green-100',
              'disabled:bg-green-700 disabled:brightness-90 disabled:hover:bg-green-700',
            ],
            variant === 'outline-danger' && [
              'text-red-600',
              'bg-transparent',
              'border border-red-600',
              'active:border-white active:text-white',
              'shadow-red-100 hover:shadow-red-200 hover:shadow-40 disabled:hover:shadow-red-100',
              'disabled:bg-red-700 disabled:brightness-90 disabled:hover:bg-red-700',
            ],
            variant === 'outline-warning' && [
              'text-yellow-600',
              'bg-transparent',
              'border border-yellow-600',
              'active:border-white active:text-white',
              'shadow-yellow-100 hover:shadow-yellow-200 hover:shadow-40 disabled:hover:shadow-yellow-100',
              'disabled:bg-yellow-700 disabled:brightness-90 disabled:hover:bg-yellow-700',
            ],
            variant === 'none' && [
              '!border-none',
              'bg-none text-base-primary',
              'hover:bg-none',
              'active:bg-none',
              'disabled:bg-none',
            ],
          ],
          //*======== Variant ===========
          'disabled:cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {Icon && <Icon className={clsxm('text-white-500', iconClassName)} />}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
export default IconButton;
