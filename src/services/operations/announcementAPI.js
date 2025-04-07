import js from "@eslint/js";
import { apiConnector } from "../apiconnector";
import { announcementEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
    CREATE_ANNOUNCEMENT_API,
    FETCH_ALL_ANNOUNCEMENTS_API,
    FETCH_ANNOUNCEMENTS_BY_TEAM_API,
    FETCH_COMPLETE_ANNOUNCEMENT_DETAILS_API
} = announcementEndpoints;

export const createAnnouncement = async (data, token) => {

    try {
        const response = await apiConnector(
            "POST",
            CREATE_ANNOUNCEMENT_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        console.log('create annnouncement response:', response)
        return response?.data?.data;

    } catch (error) {
        console.log("CREATE ANNOUNCEMENT ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const fetchAllAnnouncements = async () => {
    try {
        const response = await apiConnector(
            "GET",
            FETCH_ALL_ANNOUNCEMENTS_API
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        // console.log('create annnouncement response:', response)
        return response?.data?.data;

    } catch (error) {
        console.log("GET ALL ANNOUNCEMENT ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const fetchTeamAnnouncements = async (data, token) => {
    try {
        const response = await apiConnector(
            "POST",
            FETCH_ANNOUNCEMENTS_BY_TEAM_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        // console.log('FETCH TEAM ANNNOUNCEMENTS RESPONSE:', response)
        return response?.data?.data;

    } catch (error) {
        console.log("FETCH TEAM ANNNOUNCEMENTS ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const fetchCompleteDetailsOfAnnouncement = async (data, token) => {
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_ANNOUNCEMENT_DETAILS_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        // console.log("FETCH COMPLETE ANNOUNCEMENT DETAILS RESPONSE:- ", response)
        return response?.data?.data;

    } catch (error) {
        console.log("FETCH COMPLETE ANNOUNCEMENT DETAILS ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}
