import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManLayout from "./components/layouts/ManLayout";
import Index from "./components/layouts/Index";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<ManLayout />}>
              <Route path="/" element={<Index />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
