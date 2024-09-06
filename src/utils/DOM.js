function getAria(props) {
  return Object.entries(props)
    .filter((key) => {
      return key === 'role' || /^aria-.*/.test(key);
    })
    .reduce((r, [k, v]) => {
      r[k] = v;
      return r;
    }, {});
}

const attr = {
  getAria,
};

const DOM = {
  attr,
};

export default DOM;
