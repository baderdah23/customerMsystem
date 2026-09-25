import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

type Props = { searchValue?: string; setSearchValue: (value: string) => void };

const Header = (props: Props) => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const onclick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setSearchValue(inputValue);
  };
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1a1d23]">
      {/* Title */}
      <h1 className="text-white text-xl font-semibold">
        hi , {user?.username}
      </h1>

      {/* Search */}
      <form className="flex items-center gap-2" onSubmit={onclick}>
        <input
          type="text"
          placeholder="Search"
          onChange={onchange}
          className="bg-[#21252b] border border-[#3a3f47] rounded-md px-3 py-1.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4a5568] w-50"
        />
        <button className="bg-[#10b981] hover:bg-[#059669] text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors">
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
