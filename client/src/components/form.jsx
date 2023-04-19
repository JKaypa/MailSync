import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMembers } from "../redux/actions";

const regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Form() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", name: "", lastName: "" });

  const handleForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!regEmail.test(form.email))
      return alert("Please, enter valid email address");
    if (form.name === "") return alert("Please, enter  name");
    if (form.lastName === "") return alert("Please, enter last name");

    try {
      const { data } = await axios.post("http://localhost:3001/member", form);
      alert(data);
    } catch (error) {
      alert(error);
    }
    setForm({ email: "", name: "", lastName: "" });
    dispatch(getMembers())
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>Email</label>
        <input
          onChange={handleForm}
          value={form.email}
          type="text"
          name="email"
          placeholder="Email address"
          autoComplete="off"
          className="mb-5 p-1 rounded-lg"
        />
        <label>Name</label>
        <input
          onChange={handleForm}
          value={form.name}
          type="text"
          name="name"
          placeholder="Enter name"
          autoComplete="off"
          className="mb-5 p-1 rounded-lg"
        />
        <label>Last name</label>
        <input
          onChange={handleForm}
          value={form.lastName}
          type="text"
          name="lastName"
          placeholder="Enter last name"
          autoComplete="off"
          className="mb-5 p-1 rounded-lg"
        />
        <button className="p-4 rounded-xl mb-5 bg-yellow-400">SUBMIT</button>
      </form>
    </div>
  );
}

export default Form;
