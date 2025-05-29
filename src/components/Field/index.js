import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder }) => {
  const id = name;
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          id={id}
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (<textarea
          id={id}
          name={name}
          data-testid="field-testid"
        />
      );
      break;
    default:
      component = (
        <input
          id={id}
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      <label htmlFor={id}>{label}</label>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
 Field.defaultProps = {
   label: "Label par défaut",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
 }

export default Field;
