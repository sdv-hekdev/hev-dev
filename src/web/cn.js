const cn = (...classes) => {
  return classes.filter(Boolean).join(" ").trim()
}

export default cn
