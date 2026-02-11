import React from 'react';

const InputBox = ({displayName, input, change, type = 'text'}) => {
  return (
    <div className="mb-6">
      <label className="block font-bold mb-1">{displayName}</label>
      <input
        type={type}
        name="password"
        value={input}
        onChange={change}
        className="w-full border-4 border-black px-3 py-2 focus:outline-none focus:bg-yellow-100"
      />
    </div>
  );
};

export default InputBox;
