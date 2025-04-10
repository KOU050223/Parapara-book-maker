import { Routes, Route } from "react-router-dom"
import Home from "@/components/pages/Home"
import ReadBook from "@/components/pages/ReadBook";
import NotFound from "@/components/NotFound";
import ImageParapara from "@/components/pages/ImageParapara";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/readbook" element={<ReadBook />} />
      <Route path='/image-parapara' element={<ImageParapara/>}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
