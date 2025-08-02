"use client"

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectDropdownProps {
  options: any[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  tagContainerClassName?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedValues, onChange, tagContainerClassName }) => {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="w-64 relative" ref={inputRef}>
      <div
        className={
          `${tagContainerClassName ? tagContainerClassName : 'flex flex-nowrap'} items-center gap-1 h-10 border bg-background rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:border-black focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${open ? 'border-black' : 'border-gray-300'}`
        }
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen((v) => !v); }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* 預設不顯示空白標籤，完全不渲染 */}
        {selectedValues.map(val => {
          const opt = options.find((o: any) => o && typeof o === 'object' && 'name' in o && o.name === val);
          return (
            <span key={val} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-medium mr-1">
              <Badge text={val} color={opt?.color} size="sm" />
              <button
                type="button"
                className="ml-1 text-gray-400 hover:text-red-500"
                tabIndex={-1}
                onClick={e => {
                  e.stopPropagation();
                  onChange(selectedValues.filter(v => v !== val));
                }}
              >×</button>
            </span>
          );
        })}
        <span className="ml-auto text-gray-400 text-xs">
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      {open && (
        <div className="absolute z-50 mt-1 left-0 w-full bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto animate-fade-in">
          {options.length > 0 ? options.map((option: any) => {
            const isDisabled = typeof option?.disabled === 'boolean' ? option.disabled : false;
            const optionName = typeof option?.name === 'string' ? option.name : '';
            return (
              <label key={option.id ?? optionName} className={`flex items-center px-2 py-1 cursor-pointer ${selectedValues.includes(optionName) ? 'bg-gray-50' : ''}`} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                <Checkbox
                  className="mr-2"
                  checked={selectedValues.includes(optionName)}
                  disabled={isDisabled}
                  onCheckedChange={checked => {
                    if (checked) {
                      onChange([...selectedValues, optionName]);
                    } else {
                      onChange(selectedValues.filter(v => v !== optionName));
                    }
                  }}
                />
                <Badge text={optionName} color={option.color} size="sm" />
              </label>
            );
          }) : (
            <div className="text-xs text-gray-400 px-2 py-1">無可用選項</div>
          )}
        </div>
      )}
    </div>
  );
};
