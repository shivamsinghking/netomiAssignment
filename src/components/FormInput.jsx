
const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;