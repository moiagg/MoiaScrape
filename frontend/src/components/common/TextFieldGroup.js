import PropTypes from "prop-types";
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => (
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">{label}</label>
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      disabled={disabled}
      className="form-control"
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
    <style jsx>{`
      input.form-control {
        padding: 2.5px 0 2.5px 10px;
      }
    `}</style>
  </div>
);
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};
TextFieldGroup.defaultProps = {
  type: 'text'
}
export default TextFieldGroup;
