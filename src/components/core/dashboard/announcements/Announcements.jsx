import React, { use, useContext, useEffect, useState } from 'react'
import LayoutOuter from '../../../common/LayoutOuter'
import LayoutHead from '../../../common/LayoutHead'
import { Link } from 'react-router-dom'
import { fetchAllAnnouncements } from '../../../../services/operations/announcementAPI'
import { Spinner } from '../../../common/Spinner'
import AnnouncementsTable from './AnnouncementsTable'
import { ROLE } from '../../../../utils/constants'
import { fetchTeamAnnouncements } from '../../../../services/operations/announcementAPI'
import { AuthContext } from '../../../../Context/AuthContext'

function Announcements() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState(ROLE.ADMIN);
    const { token, team } = useContext(AuthContext);
    // console.log(data)

    async function fetchAnnouncements() {
        setLoading(true);
        const response = role === ROLE.ADMIN ? await fetchAllAnnouncements() : await fetchTeamAnnouncements({ teamId: team?._id }, token);
        setData(response)
        setLoading(false);
    }

    useEffect(() => {
        fetchAnnouncements();
    }, [role])

    return (
        <LayoutOuter>
            <LayoutHead>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-3xl font-bold text-blue-900'>Announcements</h1>
                    <div className='flex gap-3'>
                        <Link to={"/dashboard/announcements/newAnnouncement"}>
                            <button className='bg-blue-900 text-white rounded-xl px-3 py-1 hover:bg-blue-950 cursor-pointer'>
                                Make Team Announcement
                            </button>
                        </Link>
                    </div>
                </div>
            </LayoutHead>
            <div className='px-6 flex flex-col items-start justify-center gap-4 py-4'>
                <div className='w-full flex items-center gap-2'>
                    <button
                        className={` px-4 py-1 rounded-lg capitalize font-semibold border-blue-900 border cursor-pointer
                            ${role === ROLE.ADMIN ? "bg-blue-900 text-white" : "bg-gray-50 text-black hover:bg-gray-100"}`}
                        onClick={(e) => setRole(ROLE.ADMIN)}>
                        {ROLE.ADMIN}
                    </button>
                    <button
                        className={` px-4 py-1 rounded-lg capitalize font-semibold border-blue-900 border cursor-pointer
                            ${role === ROLE.TEAM ? "bg-blue-900 text-white" : "bg-gray-50 text-black hover:bg-gray-100"}`}
                        onClick={(e) => setRole(ROLE.TEAM)}>
                        {ROLE.TEAM}
                    </button>
                </div>
                {
                    loading || !data
                        ? <Spinner />
                        : <AnnouncementsTable announcements={data} />
                }
            </div>
        </LayoutOuter>
    )
}

export default Announcements
