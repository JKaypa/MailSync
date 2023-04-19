import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMembers } from "../redux/actions";

function CsvFile() {
  const dispatch = useDispatch()
  const inputRef = useRef();
  const [csv, setCsv] = useState();

  const handleCsvFile = (event) => {
    const file = event.target.files[0];
    setCsv(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!csv) return alert("Please, choose a csv file first.");
    const formData = new FormData();
    formData.append("file", csv);
    try {
      const { data } = await axios.post("http://localhost:3001/csv", formData);
      alert(data);
    } catch (error) {
      alert('There was an error, please try again');
    }

    inputRef.current.value = null;
    dispatch(getMembers())

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="file"
          name="file"
          onChange={handleCsvFile}
          className="mb-5"
        />
        <button className="p-4 w-full rounded-xl bg-yellow-400 text-yellow-950">
          UPLOAD
        </button>
      </form>
    </div>
  );
}

export default CsvFile;
