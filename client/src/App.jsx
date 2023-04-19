import Contacts from "./components/contacts";
import Header from "./components/header";
import SideBar from "./components/sideBar";

function App() {
  return (
    <div className="h-screen grid grid-cols-two">
      <div className="h-full bg-yellow-400 col-[2/3]"><Header /></div>
      <div className="p-4 row-[1/3] bg-yellow-500">
        <SideBar />
      </div>
      <div className="text-center p-4 h-[850px]">
        <h1 className="py-4 text-3xl text-yellow-950">Contacts</h1>
        <Contacts />
      </div>
    </div>
  );
}

export default App;