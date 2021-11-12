const btn =
  "py-2 px-3 rounded uppercase disabled:opacity-70 disabled:bg-disabled";

const variants = {
  primary: `${btn} bg-primary text-white`,
  secondary: `${btn} bg-secondary text-white`,
  danger: `${btn} bg-danger text-white`,
  transparent: `${btn}`,
};

const Button = (props) => {
  const { type, value, name } = props;

  return (
    <button type={type} value={value} name={name} variants={variants}></button>
  );
};

export default Button;
