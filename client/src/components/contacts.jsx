import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "../redux/actions";
import Pagination from "./paginate";

function Contacts() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 10;
  const contactsDisplayed = contacts.slice(start, start + quantity);
  

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  console.log(contacts);

  return (
    <div className="flex flex-col justify-center">
      <div className="px-20 h-[620px] flex flex-col items-center gap-2">
        <div className="w-3/5 p-3 rounded-lg font-semibold text-yellow-900 bg-yellow-200 grid grid-cols-2">
          <span>Email</span>
          <span>Full name</span>
        </div>
        {contactsDisplayed?.map((cont) => (
          <div
            key={cont.id}
            className="w-3/5 p-3 rounded-lg text-yellow-900 bg-yellow-100 grid grid-cols-2"
          >
            <span>{cont.email_address}</span>
            <span>{cont.full_name}</span>
          </div>
        ))}
      </div>
      <div className="w-ful p-2 mt-4">
        <Pagination
          quantity={quantity}
          start={start}
          setStart={setStart}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Contacts;
