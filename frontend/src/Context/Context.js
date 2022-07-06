/** @format */

import { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(""); // This state holds userID
  const [tasks, setTasks] = useState([]);
  const [call, setCall] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [pageType, setPageType] = useState("primary");
  const [user, setUser] = useState(null);

  return (
    <MyContext.Provider
      value={{
        userId,
        setUserId,
        tasks,
        setTasks,
        call,
        setCall,
        completedTasks,
        setCompletedTasks,
        pendingTasks,
        setPendingTasks,
        pageType,
        setPageType,
        user,
        setUser,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export const MyState = () => {
  return useContext(MyContext);
};

export default MyContextProvider;
