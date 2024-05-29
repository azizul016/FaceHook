/* eslint-disable no-unsafe-optional-chaining */
import React from "react";

export const getChieldId = (children) => {
  const child = React.Children.only(children);
  if ("id" in child?.props) {
    return child.props.id;
  }
};
