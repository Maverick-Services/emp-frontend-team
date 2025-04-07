import React, { useContext, useEffect, useState } from 'react'
import { fetchCompleteDetailsOfAnnouncement } from '../../../../services/operations/announcementAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext';
import { formattedFullDate } from '../../../../utils/dateFormatter';
import { Spinner } from '../../../common/Spinner';

const AnnouncementDetails = () => {

    const navigate = useNavigate()
    const { announcementId } = useParams()
    const { token } = useContext(AuthContext);
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAnnouncementDetails = async () => {
        setLoading(true)
        const result = await fetchCompleteDetailsOfAnnouncement({ announcementId }, token)
        if (result) {
            // console.log(result)
            setAnnouncement(result)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchAnnouncementDetails();
    }, [])

    if (loading || !announcement)
        return <Spinner />

    return (
        <div className='bg-[#F3F6FE] h-screen flex flex-col overflow-y-auto pb-4'>
            <div className='w-full pb-3 pt-5 px-5 bg-[#F3F6FE] flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-blue-900 pb-2'>Announcement: {announcement?.subject}</h1>
                <div className='flex gap-3 justify-center items-center'>
                    <button className='bg-blue-900 text-white rounded-xl px-3 py-1 hover:bg-blue-950 cursor-pointer'
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </div>
            <div className='h-full flex flex-col gap-3 flex-1 overflow-y-auto px-4'>
                <div className=' bg-white px-4 py-4 rounded-xl flex flex-col gap-2 shadow-sm'>
                    {
                        announcement?.raisedBy &&
                        <p><strong>Raised By:</strong> {announcement?.raisedBy?.name || announcement?.raisedBy?.teamName}</p>
                    }
                    <p><strong>Role:</strong>  {announcement?.role}</p>
                    <p><strong>Raised At:</strong> {formattedFullDate(announcement?.createdAt)}</p>
                    <p><strong>Description:</strong> {announcement?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default AnnouncementDetails
