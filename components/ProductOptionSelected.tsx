import React from "react";

interface PropTypes {
  isSelected: boolean;
  contentValue: string;
  onClick?(): void;
}

export default function ProductOptionSelected({
  contentValue,
  isSelected,
  onClick,
}: PropTypes) {
  return (
    <>
      {isSelected ? (
        <div onClick={onClick} className="content-center px-2">
          <div className="font-sans  text-tahiti-54 font-normal text-lg ">
            {contentValue}
          </div>
          <div className="bg-tahiti-54 w-2 h-2 rounded-full mb-1 mx-auto"></div>
        </div>
      ) : (
        <div onClick={onClick} className="content-center px-2">
          <div className="font-sans text-tahiti-58 font-normal text-lg ">
            {contentValue}
          </div>
        </div>
      )}
    </>
  );
}
