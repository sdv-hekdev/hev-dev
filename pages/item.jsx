const ItemPage = (props) => {
  const { title, description, type, ...otherProps } = props;

  return (
    <>
      <p type={type} {...otherProps}>
        {title}
      </p>
      <p type={type} {...otherProps}>
        {description}
      </p>
      ;
    </>
  );
};

export default ItemPage;
