import { Outlet } from "react-router";
import LeftBar from "../../components/leftBar/leftBar";
import TopBar from "../../components/topBar/topBar";

const Mainlayaut = () => {
    return (
        <div  className='app'>
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
    )
}

export default Mainlayaut;
// Inspect: https://vercel.com/alzeks-projects/client/48rftywww7jjGerPdG2VBDsWQTcj
// https://client-p2gjrrx8d-alzeks-projects.vercel.app