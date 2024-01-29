"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Toggle } from "../ui/toggle";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const resetButton = (icon: any) => {
    return (
      <Button
        variant={"unknown"}
        aria-label="Toggle bold"
        size={"icon"}
        className="h-7 w-7  justify-center items-center flex  "
        onClick={() => setActive(!active)}
      >
        {icon}
      </Button>
    );
  };
  return (
    <div className="flex justify-evenly gap-2 items-center">
      {active ? (
        <div className="flex  gap-1">
          <Input
            type="search"
            placeholder="Search..."
            className={`block bg-crimson animate-slide-left_1s_ease-in-out text-black text-xl  ml-1 rounded-sm cursor-pointer ${
              active ? "opacity-100" : "opacity-0 "
            }`}
          />
          {resetButton(
            <X
              className={`h-4 w-4 text-white  ${active ? "opacity-100" : "opacity-0 "}`}
            />
          )}
        </div>
      ) : (
        resetButton(
          <Search
            className={`h-4 w-4 text-white  ${active ? "opacity-0" : "opacity-100 "}`}
          />
        )
      )}
    </div>
  );
};

export default SearchBar;
