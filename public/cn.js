const cn = (defaultClassNames = "", { className = "" } = {}) => {
  const classNames =
    typeof defaultClassNames === "string"
      ? defaultClassNames.split(/\s+/)
      : Object.entries(defaultClassNames)
          .filter(([, active]) => active)
          .map(([cn]) => cn);

  return {
    className: [...new Set(classNames.concat(className.split(/\s+/)))]
      .join(" ")
      .trim(),
  };
};

export default cn;
