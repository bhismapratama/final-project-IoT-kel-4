import { Column } from '@tanstack/react-table';
import React, { useState } from 'react';

interface TMultiFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

const MultiFilter = <TData, TValue>({
  column,
  title,
}: TMultiFilter<TData, TValue>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSelect = (value: string) => {
    const newSelectedValues = new Set(selectedValues);
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value);
    } else {
      newSelectedValues.add(value);
    }
    const filterValues = Array.from(newSelectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  const facetedValues = column?.getFacetedUniqueValues?.() as
    | Map<string, number>
    | undefined;

  const options = facetedValues
    ? Array.from(facetedValues).map(([value, _]) => ({
        label: value,
        value,
      }))
    : [];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='px-4 py-2 bg-white border border-gray-400 rounded-md'
      >
        {title}
      </button>
      {isOpen && (
        <ul className='absolute left-0 top-full mt-2 bg-white border border-gray-400 rounded-md'>
          {options.map(option => (
            <li
              key={option.value}
              className='px-4 py-2 hover:bg-gray-100 flex items-center'
              onClick={() => handleSelect(option.value)}
            >
              <input
                type='checkbox'
                checked={selectedValues.has(option.value)}
                readOnly
                className='mr-2'
              />
              {option.label}
            </li>
          ))}
          {selectedValues.size > 0 && (
            <li
              className='px-4 py-2 hover:bg-gray-100 text-center'
              onClick={() => column?.setFilterValue(undefined)}
            >
              Clear filters
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiFilter;
