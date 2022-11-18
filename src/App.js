import axios from "axios";
import React, { useEffect, useState } from "react";


const initialValues = {
  name: "",
  lastname: "",
  age: "",
  Email: "",
  Gender: "",
};
const GetComponent = () =>{
  useEffect(() => {
    axios
    .get("http://localhost:3001/users", initialValues)
    .then(({data}) => console.log(data))

  
  }, []);

  useEffect(()=>{
    axios
    .post("http://localhost:3001/users", initialValues)
    .then(({data}) => console.log(data))
  }, []);


  useEffect(()=>{
    axios
    .put(`http://localhost:3001/users/${id}`, initialValues)
    .then(({data}) => console.log(data))
  }, [])

  useEffect(()=>{
    axios
    .delete(`http://localhost:3001/users/${id}`, initialValues)
    .then(({data}) => console.log(data))
  }, [])


  
  return <div>GetComponent</div>
};


 
const validate = (values) => {
  const errors = {};
  if (values.name.length < 4) {
    errors.name = "Name is Requiers at list 4 characters";
  }
  if (values.lastname.length < 4) {
    errors.lastname = "Last Name is Requiers at list 4 characters";
  }
  if (!values.Email) {
    errors.Email = "Email is requierd!";
  } else if (!values.Email.includes("@")) {
    errors.Email = "This Email is not valid";
  }
  if (values.age.length < 18) {
    errors.age = "User has to be over 18";
  }
  if (!values.Gender) {
    errors.Gender = "pleas Select your gender";
  }
};


 
function App() {

  
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isUserUpdating, setIsUserUpdating] = useState(false);
  const handleCHange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (!isUserUpdating) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...formValues, id: new Date().toString() },
      ]);
    } else {
      // const selectedUser = users.
      setUsers((prevUsers) => {
        const newUsersArray = prevUsers.reduce((acc, current) => {
          if (current.id === formValues.id) {
            return [...acc, { ...formValues }];
          } else return [...acc, current];
        }, []);
        return newUsersArray;
      });
    }
    setFormValues(initialValues);
    setIsUserUpdating(false);
    // setIsSubmit(true);
  };
  const onDelete = (id) => {
    setUsers((prevUsers) => {
      const newUserArray = prevUsers.filter((user) => user.id !== id);
      return newUserArray;
    });
  };
 
  const onEdit = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    setFormValues(selectedUser);
  };
  return (
    <div>
      <div className="container">
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleCHange}
        />{" "}
        {/* <button onClick={(e) => handleDelete(e)}>Delete</button>{" "} */}
        <label>Name</label>
        <div>
          <input
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleCHange}
          />{" "}
          {/* <button>Delete</button> <label>Last Name</label> */}
          <label>Last Name</label>
        </div>
        <div>
          <input
            type="number"
            name="age"
            value={formValues.age}
            onChange={handleCHange}
          />{" "}
          <label>Age</label>
        </div>
        <div>
          <input
            type="text"
            name="Email"
            value={formValues.Email}
            onChange={handleCHange}
          />{" "}
          <label>Email</label>
        </div>
        <select onChange={handleCHange}>
          <option value={formValues.Gender}>Male</option>
          <option value={formValues.Gender}>Female</option>
          <option value={formValues.Gender}>Other</option>
        </select>
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
        {users.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h1>{user.lastname}</h1>
            <button
              onClick={() => {
                setIsUserUpdating(true);
                onEdit(user.id);
              }}
            >
              edit
            </button>
            <button onClick={() => onDelete(user.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default App;