import { InputHTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import React from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={cn(
        "w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white",
        className,
      )}
    />
  );
});
{/* TODO: create a fork and fix display name error*/}
Input.displayName = "Input";

export default Input;
