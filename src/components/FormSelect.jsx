
const FormSelect = (props) => {
  const { label, errorMessage, onChange, listOfOptions =[{id: 1, name: '-'}], ...inputProps } = props;
  return (
    <div className="formSelect">
      <label>{label}</label>
      <select
        {...inputProps}
        onChange={onChange}
      >
        <option value=''></option>
      {
        listOfOptions.map((data, key) => {
          return <option key={key} value={data.name}>{data.name}</option>
        })
      }
      </select>
    </div>
  );
};

export default FormSelect;