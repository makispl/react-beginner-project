import { useState } from "react";

interface AddTodoFormProps {
  onSubmit: (title: string) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); //by default when we submit a form the HTML automatically refreshes the page - we want to prevent it and refresh onSubmit

    if (!input.trim()) return; // if the input except backspace is in place, then pass it to the parent component (the todos of the App)

    onSubmit(input);
    setInput(""); // set it to null
  }
  return (
    <form className="flex" onSubmit={handleSubmit}>
      {/* In React by default input fields have their internal state controlled by the HTML DOM, thus we can write text*/}
      {/* we can either get it as needed or use a controlled input field*/}

      <input
        value={input} // set to a controlled input
        onChange={(e) => setInput(e.target.value)}
        placeholder="What need to be done?"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
      >
        Add
      </button>
    </form>
  );
}
