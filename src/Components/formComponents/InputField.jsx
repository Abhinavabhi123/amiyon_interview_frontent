export default function InputField(Props) {
  const {
    type = "text",
    name = "",
    id = "",
    placeholder = "",
    className,
    onChange = () => {},
    onBlur = () => {},
    value=""
  } = Props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={`w-full  border border-gray-400 rounded-md outline-none px-3 py-2 ${className} `}
    />
  );
}
