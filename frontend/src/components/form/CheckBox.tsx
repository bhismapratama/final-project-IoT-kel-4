import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type CheckboxProps = {
  /** Input label */
  label?: string | React.ReactElement;
  name: string;
  /** Add value only if you're using grouped checkbox, omit value if using a single checkbox */
  value?: string | number;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>;

export default function Checkbox({
  label,
  name,
  value,
  placeholder = '',
  helperText,
  readOnly = false,
  hideError = false,
  validation,
  ...rest
}: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div>
      <div className='flex items-start gap-2'>
        <input
          {...register(name, validation)}
          {...rest}
          type='checkbox'
          name={name}
          id={`${name}_${value}`}
          value={value}
          disabled={readOnly}
          className={clsxm(
            'mt-[0.25em]',
            'shrink-0',
            'border-[#D1D5DC] rounded-sm border-2 focus:ring-0',
            'checked:bg-lightBlue-400 checked:hover:bg-lightBlue-600 checked:focus:bg-lightBlue-400 checked:active:bg-lightBlue-700',
            readOnly &&
              'cursor-not-allowed bg-gray-100 disabled:checked:bg-lightBlue-300',
            error && 'border-danger-400 bg-danger-100',
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />
        <Typography
          className={clsx(readOnly && 'cursor-not-allowed w-full')}
          as='label'
          htmlFor={`${name}_${value}`}
          variant='c2'
          weight='semibold'
          color='input'
        >
          {label}
        </Typography>
      </div>
      <div className='mt-1'>
        {!(!hideError && error) && helperText && <p>{helperText}</p>}
        {!hideError && error && (
          <Typography variant='bt'>{error?.message?.toString()}</Typography>
        )}
      </div>
    </div>
  );
}
