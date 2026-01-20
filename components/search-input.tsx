"use client";

import { useEffect, useRef, useState } from "react";

type SearchInputProps = {
  label: string;
  placeholder: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
};

export function SearchInput({ label, placeholder, onSearch, defaultValue = "" }: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 border border-[#5D5838]/10 bg-white p-6 sm:flex-row sm:items-end"
      role="search"
    >
      <div className="flex-1">
        <label htmlFor={`search-${label}`} className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">
          {label}
        </label>
        <input
          id={`search-${label}`}
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full border border-[#5D5838]/20 px-4 py-3 text-sm text-[#1B1B1B] outline-none transition focus:border-[#5D5838] focus:ring-0"
        />
      </div>
      <div className="flex items-center gap-3">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="border border-[#5D5838] px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
          >
            Clear
          </button>
        ) : null}
        <button
          type="submit"
          className="bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
        >
          Search
        </button>
      </div>
    </form>
  );
}

