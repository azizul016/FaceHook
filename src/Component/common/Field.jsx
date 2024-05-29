/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { getChieldId } from "./util";

const Field = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChieldId(children);

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Field;
