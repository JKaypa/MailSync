import CsvForm from "./csvFile";
import Form from "./form";

function SideBar() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-24">
        <h1 className="text-2xl text-center mb-5 text-yellow-950">Add New Contact</h1>
        <Form />
      </div>
      <div>
        <h1 className="text-2xl text-center mb-5 text-yellow-950">Upload a csv File</h1>
        <CsvForm />
      </div>
    </div>
  );
}

export default SideBar;
