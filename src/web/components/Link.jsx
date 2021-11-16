import NextLink from "next/link";

import cn from "./cn";

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
      <Component
        {...cn(
          {
            "text-link hover:text-link-hover active:text-link-active": !noStyle,
          },
          props
        )}
      >
        {children}
      </Component>
    </NextLink>
  );
};

export default Link;
