import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LayoutOuter from '../../../common/LayoutOuter'
import LayoutHead from '../../../common/LayoutHead'
import LayoutContent from '../../../common/LayoutContent'
import { AuthContext } from '../../../../Context/AuthContext'
import { formattedFullDate } from '../../../../utils/dateFormatter'
import { STATUS } from '../../../../utils/constants'
import { Spinner } from '../../../common/Spinner'
import { fetchTeamQueries } from '../../../../services/operations/queryAPI'

function Queries() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { token, team } = useContext(AuthContext)
    const [allQueries, setAllQueries] = useState([])


    const fetchQueries = async () => {
        setLoading(true)
        const result = await fetchTeamQueries({ teamId: team?._id }, token)
        console.log(result)
        setAllQueries(result)
        setLoading(false)
    }

    useEffect(() => {
        fetchQueries();
    }, [])

    if (loading || !allQueries) {
        return <Spinner />
    }

    return (
        <LayoutOuter>
            <LayoutHead>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-3xl font-bold text-blue-900'>My Queries</h1>
                    <div className='flex gap-3'>
                        <p className='px-3 py-1 font-semibold'><span className='bg-red-200 text-red-700 rounded-full px-2 py-1'>{allQueries?.filter(qr => qr?.status === STATUS.PENDING).length}</span> Pending</p>
                        <p className='px-3 py-1 font-semibold'><span className='bg-green-200 text-green-700 rounded-full px-2 py-1'>{allQueries?.filter(qr => qr?.status === STATUS.RESOLVED).length}</span> Resolved</p>
                        <Link to={"/dashboard/queries/raiseQuery"}>
                            <button className='bg-blue-900 text-white rounded-xl px-3 py-1 hover:bg-blue-950 cursor-pointer'>Raise Query</button>
                        </Link>
                    </div>
                </div>
            </LayoutHead>
            <LayoutContent>
                <div className='flex flex-col gap-4'>

                    {
                        allQueries &&
                            allQueries.length <= 0 ? <p>No Queries yet... </p>
                            : allQueries.map((qr, index) => (
                                <Link to={`/dashboard/queries/${qr?._id}`} key={index}>
                                    <div className='flex w-full justify-center items-center gap-3 bg-white px-3 py-3 hover:border-purple-800 border-2 border-white transition-all ease-in-out duration-300 rounded-xl'>
                                        <h2 className='font-semibold'>{qr?.raisedBy?.teamName}</h2>
                                        <p className='flex-1'>{qr?.subject}</p>
                                        <p>{formattedFullDate(qr?.createdAt)}</p>
                                        <p
                                            className={`rounded-full px-3
                                            ${qr?.status === STATUS.PENDING ? "bg-red-200 text-red-700 " : "bg-green-200 text-green-700 "}`}
                                        >{qr?.status}</p>
                                    </div>
                                </Link>
                            ))
                    }

                </div>
            </LayoutContent>
        </LayoutOuter>
    )
}

export default Queries
