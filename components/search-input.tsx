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
      className="flex w-full flex-col gap-2 rounded-2xl border border-outline/20 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
      role="search"
    >
      <div className="flex-1">
        <label htmlFor={`search-${label}`} className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {label}
        </label>
        <input
          id={`search-${label}`}
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-outline/20 px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex items-center gap-2">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-full border border-outline px-3 py-2 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Clear
          </button>
        ) : null}
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Search
        </button>
      </div>
    </form>
  );
}

