import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'warning',
  'danger',
  'success',
  'label',
  'black',
  'outline-primary',
  'outline-warning',
  'outline-danger',
  'outline-success',
  'outline-black',
  'outline-white',
}

enum ButtonSize {
  'sm',
  'base',
  'lg',
}

type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  textClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      textClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'button inline-flex items-center justify-center rounded-md',
          'focus:warning-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          //*=========== Size ===========
          [
            size === 'lg' && [
              'text-lg md:text-xl min-h-[28px] py-1 px-2 md:min-h-[48px] md:py-2.5 md:px-6',
            ],
            size === 'base' && [
              'text-sm md:text-base min-h-[24px] py-0.5 px-1 md:min-h-[40px] md:py-2 md:px-3.5',
            ],
            size === 'sm' && [
              'text-xs md:text-sm min-h-[22px] py-[1px] px-[3px] md:min-h-[34px] md:py-1.5 md:px-2.5',
            ],
          ],
          //*======== Size ===========
          //*=========== Variants ===========
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
              'bg-white',
              'ring-2 ring-typo-outline',
              'hover:bg-typo-label hover:text-white active:bg-typo-label',
              'active:bg-typo-label disabled:bg-typo-label disabled:text-white-500 disabled:brightness-95',
            ],
            variant === 'black' && [
              'text-white',
              'bg-typo-primary',
              'hover:bg-black-300 hover:shadow-40',
              'active:bg-typo-primary active:border-white active:text-white',
              'shadow-black-100 hover:shadow-black-200 disabled:hover:shadow-black-100',
              'disabled:bg-black-400 disabled:brightness-95',
            ],
            variant === 'outline-primary' && [
              'text-[#687083]',
              'border border-[#E4E7EB]',
              'bg-white',
              // 'hover:bg-transparent',
              'active:border-white active:text-white',
              'shadow-blue-100 hover:shadow-blue-200 hover:shadow-40 disabled:hover:shadow-blue-100',
              'disabled:bg-blue-700 disabled:brightness-90 disabled:hover:bg-transparent',
            ],
            variant === 'outline-danger' && [
              'text-[#687083]',
              'border border-[#E4E7EB]',
              'bg-gray-300',
              // 'hover:bg-transparent',
              'active:border-white active:text-white',
              'shadow-red-100 hover:shadow-red-200 hover:shadow-40 disabled:hover:shadow-red-100',
              'disabled:bg-red-700 disabled:brightness-90 disabled:hover:bg-transparent',
            ],
            variant === 'outline-warning' && [
              'text-yellow-600',
              'border border-yellow-600',
              'bg-transparent',
              'hover:bg-transparent',
              'active:border-white active:text-white',
              'shadow-yellow-100 hover:shadow-yellow-200 hover:shadow-40 disabled:hover:shadow-yellow-100',
              'disabled:bg-yellow-700 disabled:brightness-90 disabled:hover:bg-transparent',
            ],
            variant === 'outline-success' && [
              'text-[#687083]',
              'border border-[#E4E7EB]',
              'bg-gray-200',
              // 'hover:bg-transparent',
              'active:border-white active:text-white',
              'shadow-green-100 hover:shadow-green-200 hover:shadow-40 disabled:hover:shadow-green-100',
              'disabled:bg-green-700 disabled:brightness-90 disabled:hover:bg-transparent',
            ],
            variant === 'outline-black' && [
              'text-typo-primary',
              'border border-typo-primary',
              'bg-transparent',
              'hover:bg-black-50',
              'active:border-white active:text-white',
              'shadow-black-100 hover:shadow-black-200 hover:shadow-40 disabled:hover:shadow-black-100',
              'disabled:bg-black-50 disabled:brightness-90 disabled:hover:bg-transparent',
            ],
            variant === 'outline-white' && [
              'text-typo-white',
              'border border-typo-white',
              'bg-transparent',
              'hover:bg-typo-white-50',
              'active:border-black active:text-black',
              'shadow-black-100 hover:shadow-black-200 hover:shadow-40 disabled:hover:shadow-black-100',
              'disabled:bg-black-50 disabled:brightness-90 disabled:hover:bg-transparent',
            ],
          ],
          //*======== Variants ===========
          'disabled:cursor-not-allowed',
          // 'hover:bg-typo-label',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              [
                ['primary', 'danger'].includes(variant) && 'text-white-500',
                ['warning', 'label'].includes(variant) && 'text-gray-500',
              ],
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {/* Left Icon */}
        {LeftIcon && (
          <div
            className={clsxm([
              size === 'sm' && 'mr-[10px]',
              size === 'base' && 'mr-[8px]',
              size === 'lg' && 'mr-[8px]',
            ])}
          >
            <LeftIcon
              className={clsxm(
                'text-sm md:text-2xl font-semibold',
                leftIconClassName,
              )}
            />
          </div>
        )}
        <span className={textClassName}>{children}</span>
        {/* Right Icon */}
        {RightIcon && (
          <div
            className={clsxm([
              size === 'sm' && 'ml-[10px]',
              size === 'base' && 'ml-[8px]',
              size === 'lg' && 'ml-[8px]',
            ])}
          >
            <RightIcon
              className={clsxm(
                'text-sm md:text-2xl font-semibold',
                rightIconClassName,
              )}
            />
          </div>
        )}
      </button>
    );
  },
);


Button.displayName = 'Button';
export default Button;
