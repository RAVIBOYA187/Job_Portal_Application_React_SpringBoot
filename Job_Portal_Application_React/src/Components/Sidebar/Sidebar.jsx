import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";

import {
  FaHome,
  FaTachometerAlt,
  FaPlus,
  FaBriefcase,
  FaSearch,
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaUsers,
  FaClipboardList,
  FaChartBar,
  FaBell
} from "react-icons/fa";


const Sidebar = ({ user }) => {

 const {id} = useParams();
return (

<div className={styles.sidebar}>


<h2 className={styles.logo}>
 JobTracker
</h2>



<div className={styles.navSection}>


{/* USER */}

{
user?.role === "user" && 
<>

<NavLink 
to="/app"
className={styles.btn}
>

<FaHome className={styles.icon}/>
Home

</NavLink>



<NavLink 
to="/app"
end
className={({isActive}) =>
isActive 
? `${styles.btn} ${styles.active}`
: styles.btn
}
>

<FaTachometerAlt className={styles.icon}/>

Dashboard

</NavLink>




<NavLink 
to="/app/browse-jobs"
className={styles.btn}
>

<FaSearch className={styles.icon}/>

Browse Jobs

</NavLink>



<NavLink
to="/app/my-applications"
className={styles.btn}
>

<FaBriefcase className={styles.icon}/>

My Applications

</NavLink>



<NavLink
to="/app/saved-jobs"
className={styles.btn}
>

<FaHeart className={styles.icon}/>

Saved Jobs

</NavLink>



<NavLink
to="/app/notifications"
className={styles.btn}
>

<FaBell className={styles.icon}/>

Notifications

</NavLink>



<NavLink
  to={`/app/profile/${user?.id}`}
  className={styles.btn}
>
  <FaUser className={styles.icon} />
  Profile
</NavLink>

</>
}





{/* RECRUITER */}

{
user?.role === "recruiter" && 
<>







<div className={styles.menuHeading}>
RECRUITER
</div>
<NavLink 
to="/"
className={styles.btn}
>

<FaHome className={styles.icon}/>
Home

</NavLink>
<NavLink
  to="/app/recruiter/dashboard"
  className={styles.btn}
>
  <FaTachometerAlt className={styles.icon}/>
  Dashboard
</NavLink>

<NavLink
to="/app/recruiter/jobs"
className={styles.btn}
>

<FaBriefcase className={styles.icon}/>

My Posted Jobs

</NavLink>



<NavLink
to="/app/recruiter/post-job"
className={styles.btn}
>

<FaPlus className={styles.icon}/>

Post Job

</NavLink>



<NavLink
to="/app/recruiter/applicants"
className={styles.btn}
>

<FaUsers className={styles.icon}/>

Applicants

</NavLink>



<NavLink
  to={`/app/recruiter-profile/${user?.id}`}
  className={styles.btn}
>
  <FaUser className={styles.icon}/>
  Profile
</NavLink>


</>
}





{/* ADMIN */}

{
user?.role==="admin" &&
<>


<div className={styles.menuHeading}>
ADMIN
</div>



<NavLink
to="/app/admin"
className={styles.btn}
>

<FaChartBar className={styles.icon}/>

Admin Dashboard

</NavLink>



<NavLink
to="/app/admin/add-job"
className={styles.btn}
>

<FaPlus className={styles.icon}/>

Add Job

</NavLink>




<NavLink
to="/app/admin/manage-jobs"
className={styles.btn}
>

<FaClipboardList className={styles.icon}/>

Manage Jobs

</NavLink>



<NavLink
to="/app/admin/applicants"
className={styles.btn}
>

<FaUsers className={styles.icon}/>

Applicants

</NavLink>


</>

}



</div>




<NavLink
to="/"
className={`${styles.btn} ${styles.logout}`}
>

<FaSignOutAlt className={styles.icon}/>

Logout

</NavLink>



</div>


)

}


export default Sidebar;