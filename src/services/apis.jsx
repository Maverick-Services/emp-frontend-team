// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://erp-backend-1-five.vercel.app/api";
// const BASE_URL = "http://localhost:5000/api";

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

export const queryEndPoints = {
    CREATE_QUERY_API: BASE_URL + '/users/createQuery', // POST
    ADD_REPLY_API: BASE_URL + '/users/addReply', // POST
    FETCH_QUERIES_BY_TEAM_API: BASE_URL + '/users/fetchQueriesByTeam',
    FETCH_COMPLETE_QUERY_DETAILS_API: BASE_URL + '/users/fetchCompleteQueryDetails', // POST
}

export const announcementEndpoints = {
    CREATE_ANNOUNCEMENT_API: BASE_URL + '/users/createAnnouncement', // POST
    DELETE_ANNOUNCEMENT_API: BASE_URL + '/users/deleteAnnouncement', // POST
    FETCH_ANNOUNCEMENTS_BY_TEAM_API: BASE_URL + '/users/fetchAnnouncementsByTeam', // POST
    FETCH_ALL_ANNOUNCEMENTS_API: BASE_URL + '/users/fetchAllAnnouncements', // GET
    FETCH_COMPLETE_ANNOUNCEMENT_DETAILS_API: BASE_URL + '/users/fetchCompleteAnnouncementDetails', // POST
}