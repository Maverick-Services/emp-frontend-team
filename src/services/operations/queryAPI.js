import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { queryEndPoints } from "../apis";

const {
    CREATE_QUERY_API,
    ADD_REPLY_API,
    // FETCH_ALL_QUERIES_API,
    FETCH_COMPLETE_QUERY_DETAILS_API,
    FETCH_QUERIES_BY_TEAM_API
} = queryEndPoints;

export const createQuery = async (data, token) => {
    let toastId = toast.loading("Raising Query...")

    try {
        const response = await apiConnector(
            "POST",
            CREATE_QUERY_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        toast.success(response?.data?.message)
        return response?.data?.data;

    } catch (error) {
        console.log("CREATE QUERY ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    } finally {
        toast.dismiss(toastId);
    }
}

export const fetchTeamQueries = async (data, token) => {
    try {
        const response = await apiConnector(
            "POST",
            FETCH_QUERIES_BY_TEAM_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        // console.log("FETCH TEAM QUERIES RESPONSE:- ", response)
        // toast.success(response?.data?.message)
        return response?.data?.data;

    } catch (error) {
        console.log("FETCH TEAM QUERIES ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const fetchCompleteDetailsOfQuery = async (data, token) => {
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_QUERY_DETAILS_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        // console.log("FETCH COMPLETE QUERY DETAILS RESPONSE:- ", response)
        return response?.data?.data;

    } catch (error) {
        console.log("FETCH COMPLETE QUERY DETAILS ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const addQueryReply = async (data, token) => {

    try {
        const response = await apiConnector(
            "POST",
            ADD_REPLY_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        // toast.success(response?.data?.message)
        return response?.data?.data;

    } catch (error) {
        console.log("ADD QUERY REPLY ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}