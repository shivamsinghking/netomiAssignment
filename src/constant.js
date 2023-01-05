export  const inputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    formtype: "inputbox",
    placeholder: "Username",
    label: "Username"
  },
  {
    id: 2,
    name: "email",
    type: "email",
    formtype: "inputbox",
    placeholder: "Email",
    label: "Email"
  },
  {
    id: 3,
    name: "contactNumber",
    formtype: "inputbox",
    type: "number",
    placeholder: "1234567890",
    label: "Contact Number",
  },
  {
    id: 4,
    name: "country",
    type: "text",
    formtype: "selectbox",
    placeholder: "...",
    label: "Country"
  },
  {
    id: 5,
    name: "state",
    type: "text",
    formtype: "selectbox",
    placeholder: "...",
    label: "State"
  },
];

export const URL = "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
