import Sidebar from "../Sidebar/Sidebar";
import "./layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({user}) => {

console.log("LAYOUT USER:",user);

return (

<div className="app">

<Sidebar user={user}/>


<div className="main">

<div className="content">
<Outlet context={{ user }}/>
</div>

</div>


</div>

)

}

export default Layout;