const btn =
  "inline-flex items-center border border-transparent font-medium shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";

const variants = {
  xs: `${btn} px-2.5 py-1.5 text-xs rounded`,
  s: `${btn} px-3 py-2 text-sm leading-4 font-medium rounded-md`,
  m: `${btn} px-4 py-2 text-sm font-medium rounded-md`,
  l: `${btn} px-4 py-2 text-base font-medium rounded-md`,
  xl: `${btn} px-6 py-3 text-base font-medium rounded-md`,
  signin: `${btn} px-6 py-3 text-base font-medium rounded-md`,
};

const Button = (props) => {
  const { variant, ...otherProps } = props;

  return <button type="button" variant={variants} {...otherProps}></button>;
};
export default Button;
