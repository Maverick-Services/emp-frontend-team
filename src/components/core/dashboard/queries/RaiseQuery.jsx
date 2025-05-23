import React, { useContext, useState } from 'react'
import LayoutOuter from '../../../common/LayoutOuter'
import LayoutHead from '../../../common/LayoutHead'
import LayoutContent from '../../../common/LayoutContent'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { createQuery } from '../../../../services/operations/queryAPI';
import { ROLE } from '../../../../utils/constants';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RaiseQuery() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { team, token } = useContext(AuthContext)

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm();

    async function handleRaiseQuery(data) {
        setLoading(true)
        data = {
            ...data,
            role: ROLE.TEAM,
            teamId: team?._id,
        }
        const result = await createQuery(data, token);

        if (result) {
            setValue('subject', '')
            setValue('description', '')
            navigate("/dashboard/queries")
        } else {
            setError("Error in raising query!")
        }

        setLoading(false);
    }

    return (
        <LayoutOuter>
            <LayoutHead>
                <h1 className='text-3xl font-bold text-blue-900 pb-2'>Raise New Query</h1>
            </LayoutHead>
            <LayoutContent>
                <div className='flex gap-7 w-full  rounded-xl  '>
                    <form
                        className='rounded-xl flex-1 w-full flex p-6 flex-col gap-3 shadow-md bg-white'
                        onSubmit={handleSubmit(handleRaiseQuery)}
                    >
                        <TextField
                            id="subject"
                            label="Subject"
                            variant="outlined"
                            color="secondary"
                            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                            {...register("subject", {
                                required: {
                                    value: true,
                                    message: "Subject is Required"
                                }
                            })}
                            error={Boolean(errors.subject)}
                            helperText={errors.subject?.message}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            color="secondary"
                            multiline
                            rows={7}
                            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description is required"
                                }
                            })}
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                        />
                        {error &&
                            <p className='text-red-600'>Error in raising query!</p>
                        }
                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-blue-900 text-white rounded-lg px-3 py-1 hover:bg-blue-950 cursor-pointer disabled:bg-gray-700'
                        >{loading ? "Sending..." : "Send"}</button>
                    </form>

                    <img src="/contact.jpg" alt="image" className='object-cover w-[45%] rounded-xl shadow-md' />
                </div>

            </LayoutContent>
        </LayoutOuter>
    )
}

export default RaiseQuery
