const Input = (props) => {
  const { name, type, id, placeholder } = props;

  return (
    <input
      //https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input
      type={type}
      className="w-full border-2 rounded-md px-1 text-gray-900 placeholder-gray-500 "
      placeholder={placeholder}
    />
  );
};

export default Input;
