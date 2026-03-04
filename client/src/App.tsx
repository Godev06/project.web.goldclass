import { useState } from "react";
import Sidebar from "./layouts/Sidebar.tsx";
import Header from "./layouts/Header.tsx";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex bg-slate-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Header />
    </div>
  );
};

export default App;
