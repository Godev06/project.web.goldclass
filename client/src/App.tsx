import { useState } from "react"
import Sidebar from "./layouts/SideBar.tsx"

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default App;