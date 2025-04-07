import { createContext, useState } from "react";
import { tasksData } from "../data/dummy";
import { useEffect } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [team, setTeam] = useState(
        localStorage?.getItem("team") ? JSON.parse(localStorage?.getItem("team")) : null
    );
    const [tasks, setTasks] = useState(tasksData);
    const [task, setTask] = useState({});
    const [steps, setSteps] = useState([]);
    const [editTask, setEditTask] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(
        localStorage?.getItem("token") ? localStorage?.getItem("token") : null
    )

    useEffect(() => {
        token && localStorage.setItem("token", token);
        // setToken(localStorage.getItem("token"));
    }, [token]);

    useEffect(() => {
        team && localStorage.setItem("team", JSON.stringify(team));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    }, [team]);

    let values = {
        team, setTeam,
        token, setToken,
        task, setTask,
        tasks, setTasks,
        steps, setSteps,
        editTask, setEditTask,
        loading, setLoading,
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;