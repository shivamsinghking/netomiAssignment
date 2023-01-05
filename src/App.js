import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import { validateFormData} from "./helperFn";
import { inputs, URL } from "./constant";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    country: "",
    state: "",
    countryNumber: "",
  });

  const [formValidations, setFormValidations] = useState([]);
  const [countriesList, setCountriesList] = useState([{}]);
  const [stateList, setStateList] = useState([])

  // For getting msg from parent Window
  useEffect(() => {
    window.addEventListener('message', (e) => {
      setFormValidations(JSON.parse(e.data))
    })
  }, [])

  // NOTE: for getting countries data
  useEffect(() => {
    axios.get(URL)
    .then((res) => setCountriesList([...res.data]))
    .catch((err) => console.log(err))
  }, [])

  const onChange = (e) => {
    if(e.target.name === 'country'){
      let states = []
      countriesList && countriesList.map((data, key) => {
        if(data.name === e.target.value){
          states = data.states
        }
        return true
      })
      setStateList([...states])
      setValues({ ...values, [e.target.name]: e.target.value, state: ''});
    }else{
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData(formValidations, values);

    if(errors.length === 0){
      window.parent.postMessage(JSON.stringify({Result: {Success: "All fields are valid"}}), '*')
    }else{
      window.parent.postMessage(JSON.stringify({Result: errors}), '*')
    }
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          if (input.formtype === "inputbox") {
            return <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          } else {
            return <FormSelect 
              key={input.id}
              {...input}
              value={values[input.name]}
              listOfOptions={(input.name === 'country') ? countriesList : stateList}
              onChange={onChange}
            />
          }

        })}
        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default App;