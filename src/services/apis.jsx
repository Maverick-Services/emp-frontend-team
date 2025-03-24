// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://erp-backend-1-five.vercel.app/api";
const BASE_URL = "http://localhost:5000/api";

export const authEndpoints = {
    TEAM_LOGIN_API: BASE_URL + "/teams/login/"
}

export const teamEndpoints = {
    FETCH_TEAM_MEMBERS_API: BASE_URL + "/teams/getTeamMembers"
}

export const taskEndpoints = {
    CREATE_TASK_API: BASE_URL + "/tasks/createTask",
    EDIT_TASK_API: BASE_URL + "/tasks/updateTask",
    DELETE_TASK_API: BASE_URL + "/tasks/deleteTask",
    FETCH_COMPLETE_TASK_DETAILS_API: BASE_URL + "/tasks/getTaskById",
    FETCH_TASKS_API: BASE_URL + "/tasks/",
    CREATE_STEP_API: BASE_URL + "/steps/createStep",
    EDIT_STEP_API: BASE_URL + "/steps/updateStep",
}