function TextInput({ autoFocus = false, placeholder = "", value = "", onChange, error = false, maxLength }) {
  return (
    <input
      className={
        "w-[18em] h-[2em] bg-[#666] text-white py-[.2em] px-[.6em] focus:outline-none placeholder-gray-200 font-medium lg:w-[200px] lg:h-[20px]" +
        (error && " border-[#b9090b] border-2")
      }
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      maxLength={maxLength}
    />
  )
}

export default TextInput
