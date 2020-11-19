const React = require("react");
const Preview = require("./src/components/Preview").default;

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }) => {
  return <Preview {...props}>{element}</Preview>;
};
