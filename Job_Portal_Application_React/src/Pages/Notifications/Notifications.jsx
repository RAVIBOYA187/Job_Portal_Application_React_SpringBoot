// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Notifications.module.css";
// import { FaTrash } from "react-icons/fa";
// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
// const [selectedIds, setSelectedIds] = useState([]);
//   useEffect(() => {
//     axios.get("http://localhost:5000/notifications")
//       .then(res => setNotifications(res.data));
//   }, []);
// const markAsRead = async (id) => {
//   try {
//     await axios.patch(`http://localhost:5000/notifications/${id}`, {
//       read: true
//     });

//     setNotifications((prev) =>
//       prev.map((n) =>
//         n.id === id ? { ...n, read: true } : n
//       )
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };
// const deleteNotification = async (id) => {
//   try {
//     await axios.delete(`http://localhost:5000/notifications/${id}`);

//     setNotifications((prev) =>
//       prev.filter((n) => n.id !== id)
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };
// const toggleSelect = (id) => {
//   setSelectedIds((prev) =>
//     prev.includes(id)
//       ? prev.filter((i) => i !== id)
//       : [...prev, id]
//   );
// };
// const deleteSelected = async () => {
//   try {
//     await Promise.all(
//       selectedIds.map((id) =>
//         axios.delete(`http://localhost:5000/notifications/${id}`)
//       )
//     );

//     setNotifications((prev) =>
//       prev.filter((n) => !selectedIds.includes(n.id))
//     );

//     setSelectedIds([]);

//   } catch (err) {
//     console.log(err);
//   }
// };
//   return (
    
//     <div className={styles.container}>
//      <input
//   type="checkbox"
//   checked={selectedIds.includes(notifications.id)}
//   onChange={() => toggleSelect(notifications.id)}
// />
//       <div className={styles.header}>
//         <h2>📬 Notifications</h2>
//         <p>Your application updates appear here</p>
//       </div>

//       {notifications.length === 0 ? (
//         <div className={styles.empty}>No Notifications</div>
//       ) : (
//         notifications.slice().reverse().map((n) => (
//           <div
//             key={n.id}
//             className={`${styles.card} ${!n.read ? styles.unread : ""}`}
//           >

//             {/* left unread bar */}
//             {!n.read && <div className={styles.leftBar}></div>}

//             <div className={styles.content}>

//               <div className={styles.topRow}>
//                 <h3>
//                   {n.title || "Application Update"}
//                 </h3>

//                 <span className={styles.time}>
//                   {n.date}
//                 </span>
//               </div>

//               <p className={styles.message}>
//                 {n.message}
//               </p>

//               {n.reason && (
//                 <div className={styles.reason}>
//                   ❌ Rejection Reason: {n.reason}
//                 </div>
//               )}

//               <div className={styles.actions}>

//   {/* <button
//     onClick={() => markAsRead(n.id)}
//     disabled={n.read}
//   >
//     Mark as Read
//   </button>

//   <button
//     onClick={() => deleteNotification(n.id)}
//   >
//     Delete
//   </button> */}
//     <div className={styles.leftActions}>
//     <button
//       onClick={() => markAsRead(n.id)}
//       disabled={n.read}
//     >
//       Mark as Read
//     </button>
//   </div>

//   {/* right side delete icon (hidden by default) */}
//   <div className={styles.rightActions}>
//     {/* <button
//       className={styles.deleteIcon}
//       onClick={() => deleteNotification(n.id)}
//     >
//       🗑
//     </button> */}
//     <button
//   className={styles.deleteIcon}
//   onClick={() => deleteNotification(n.id)}
// >
//   <FaTrash />
// </button>
//   </div>

// </div>
//             </div>

//           </div>
//         ))
//       )}
// {selectedIds.length > 0 && (
//   <button
//     className={styles.bulkDeleteBtn}
//     onClick={deleteSelected}
//   >
//     🗑 Delete Selected ({selectedIds.length})
//   </button>
// )}
//     </div>
//   );
// };

// export default Notifications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Notifications.module.css";
import { FaTrash } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notifications")
      .then((res) => setNotifications(res.data));
  }, []);

  // mark as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/notifications/${id}`, {
        read: true,
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // delete single
  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/notifications/${id}`
      );

      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );

      setSelectedIds((prev) =>
        prev.filter((i) => i !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // checkbox select
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // bulk delete
  const deleteSelected = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(
            `http://localhost:5000/notifications/${id}`
          )
        )
      );

      setNotifications((prev) =>
        prev.filter((n) => !selectedIds.includes(n.id))
      );

      setSelectedIds([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <h2>📬 Notifications</h2>
        <p>Your application updates appear here</p>
      </div>

      {/* BULK DELETE BUTTON */}
      {selectedIds.length > 0 && (
        <button
          className={styles.bulkDeleteBtn}
          onClick={deleteSelected}
        >
          🗑 Delete Selected ({selectedIds.length})
        </button>
      )}

      {/* EMPTY STATE */}
      {notifications.length === 0 ? (
        <div className={styles.empty}>
          <h4>No Notifications</h4>
           <p>
    You’ll get updates about job applications, interview status,
    and recruiter messages here.
  </p>
        </div>
      ) : (
        notifications
          .slice()
          .reverse()
          .map((n) => (
            <div
              key={n.id}
              className={`${styles.card} ${
                !n.read ? styles.unread : ""
              }`}
            >

              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={selectedIds.includes(n.id)}
                onChange={() => toggleSelect(n.id)}
                className={styles.checkbox}
              />

              {/* unread bar */}
              {!n.read && (
                <div className={styles.leftBar}></div>
              )}

              <div className={styles.content}>

                {/* TOP */}
                <div className={styles.topRow}>
                  <h3>
                    {n.title ||
                      (n.message.includes("Interview")
                        ? "Interview Update 📅"
                        : "Application Update 📩")}
                  </h3>

                  <span className={styles.time}>
                    {n.date}
                  </span>
                </div>

                {/* MESSAGE */}
                <p className={styles.message}>
                  {n.message}
                </p>

                {/* REASON */}
                {n.reason && (
                  <div className={styles.reason}>
                    ❌ Reason: {n.reason}
                  </div>
                )}

                {/* ACTIONS */}
                <div className={styles.actions}>

                  <button
                    onClick={() => markAsRead(n.id)}
                    disabled={n.read}
                  >
                    Mark as Read
                  </button>

                  <button
                    className={styles.deleteIcon}
                    onClick={() =>
                      deleteNotification(n.id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Notifications;