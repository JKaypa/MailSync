import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

function Header() {
  const contacts = useSelector((state) => state.contacts);

  const headers = [
    { label: "Id", key: "id" },
    { label: "Email", key: "email_address" },
    { label: "FullName", key: "full_name" },
  ];

  const csvLink = {
    filename: "file.csv",
    headers: headers,
    data: contacts,
  };

  return (
    <div className="h-full px-5 flex justify-between items-center">
      <h1 className="text-2xl text-yellow-900 font-semibold">MailSync</h1>
      <CSVLink {...csvLink} className="p-1 px-3 text-yellow-950 rounded-md bg-yellow-500">Download csv file</CSVLink>
    </div>
  );
}

export default Header;
