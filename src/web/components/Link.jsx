import NextLink from "next/link";

const Link = (props) => {
  const {
    as: Component = "a",
    noStyle,
    asUrl,
    children,
    ...otherProps
  } = props;

  return (
    <NextLink as={asUrl} {...otherProps}>
      <Component className="text-link hover:text-link-hover active:text-link-active">
        {children}
      </Component>
    </NextLink>
  );
};

export default Link;
