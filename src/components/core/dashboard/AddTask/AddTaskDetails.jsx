import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";
import { data, useNavigate, useParams } from "react-router-dom";
import { ROLE, STATUS } from "../../../../utils/constants";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';
import { createStep, createTask, editStepDetails, editTaskDetails } from "../../../../services/operations/taskAPI";
import { formattedFullDate } from "../../../../utils/dateFormatter";
import { fetchTeamMembers } from "../../../../services/operations/teamAPI";

export const AddTaskDetails = ({ members,task, editTask, setShowDetails, showDetails }) => {
  const navigate = useNavigate();
  const { 
    token, setTask, steps, setSteps, loading 
  } = useContext(AuthContext);

  const [step, setStep] = useState({
    taskId: task?._id,
    name: "",
    description: "",
    assignedTo:members && members[0]?._id,
    // deadline: "",
    status: STATUS.PENDING,
  });
  const [editStep, setEditStep] = useState(null);

  const {
    handleSubmit,
    register,
    reset,
    isSubmitSuccessful,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {

    if (editTask) {
      setValue("name", task?.name);
      setValue("description", task?.description);
      setValue("clientName", task?.clientName);
      setValue("deadline", formattedFullDate(task?.deadline));
      setValue("status",task?.status);
      setSteps(task?.steps ? task?.steps : []);
    } 
  }, []);

  const { taskId } = useParams();
  useEffect(() => {
    if (!taskId) {
      setTask({});
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      task?.name !== currentValues?.name ||
      task?.description !== currentValues?.description ||
      task?.clientName !== currentValues?.clientName ||
      task?.status !== currentValues?.status ||
      formattedFullDate(task?.deadline) !== formattedFullDate(currentValues?.deadline) 
    )
      return true;
    else return false;
  };

  const stepInputChangeHandler = (e) => {
    e.preventDefault();
    setStep((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getStatus = (data)=>{
    return Object.values(STATUS).filter(st => st == data?.status)[0];
  }

  const getAssignedName = (id)=>{
    const assignedEmp = members?.filter(mb => mb?._id === id)[0]?.name; 
    return assignedEmp;
  }

  const addStepInTask = async() => {
    if (editStep) {
      if (
        step?.name === editStep?.name &&
        step?.description === editStep?.description &&
        step?.assignedTo === editStep?.assignedTo &&
        step?.status === editStep?.status
      ){
        setEditStep(null);
        setStep({
          taskId: task?._id,
          name: "",
          description: "",
          assignedTo:members && members[0]?._id,
          // deadline: "",
          status: STATUS.PENDING,
        });
        return;
      }

      // console.log("Edit Step: ",step);

      const updatedStep = await editStepDetails({...step,stepId:editStep?._id},token);
      if(updatedStep){
        const stepIndex = steps?.findIndex((st) => st?._id === editStep?._id);
        let stepsData = steps;
        stepsData[stepIndex] = { ...updatedStep};
        setSteps(stepsData);
        setTask({
          ...task,
          steps: stepsData,
        });
      }
      
      setEditStep(null);
      setStep({
        taskId: task?._id,
        name: "",
        description: "",
        assignedTo:members && members[0]?._id,
        // deadline: "",
        status: STATUS.PENDING,
      });
      return;
    } else {
      if (!step?.name || !step?.description || !step?.assignedTo || !step?.status)
        return;
      
      const result = await createStep(step,token);
      setTask(result);
      setSteps(result?.steps);
      setStep({
        taskId: task?._id,
        name: "",
        description: "",
        assignedTo:members && members[0]?._id,
        // deadline: "",
        status: STATUS.PENDING,
      });
    }
  };

  const userFormSubmitHandler = async(data) => {

    if(
      data?.status && data?.status === STATUS.COMPLETED &&
      task?.steps && task?.steps?.length && 
      task?.steps?.filter(st => st?.status === STATUS.PENDING).length > 0
    ){
      toast.error("Please Complete All Steps before marking task complete");
      return;
    }

    if (editTask) {
      if(isFormUpdated(data)){
        const currentValues = getValues();
        let reqBody = {
          taskId: task?._id,
          team: task?.team
        };

        if (currentValues?.name !== task?.name)
          reqBody = { ...reqBody, name: data?.name };

        if (currentValues?.description !== task?.description)
          reqBody = { ...reqBody, description: data?.description };

        if (currentValues?.clientName !== task?.clientName)
          reqBody = { ...reqBody, clientName: data?.clientName };

        if (currentValues?.status !== task?.status)
          reqBody = { ...reqBody, status: data?.status };

        if (formattedFullDate(currentValues?.deadline) !== formattedFullDate(task?.deadline))
          reqBody = { ...reqBody, deadline: formattedFullDate(data?.deadline) };

        const result = await editTaskDetails(reqBody,token);
        if (result) {
          setTask(result);
          navigate("/dashboard/tasks");
        }
      }else{
        toast.error("No changes made so far");
      }
      return;
    }

    data = {
      ...data,
      role: ROLE.EMPLOYEE,
    };
    // console.log("new task",data);

    const response = await createTask(data,token);
    if (response) {
      navigate("/dashboard/tasks");
    }
  };

  
  if(loading)
    return <Spinner/>

  return (
    <motion.div
      /** 
       * Framer Motion for a smooth fade-in & slide-up effect
       */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-5 max-w-4xl p-6 bg-white shadow-md rounded-md flex flex-col gap-6"
    >

      {/* Header Row */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#1C398E]">{editTask ? "Edit" : "Add"} Task Details</h1>
          {/* <p className={`p-1 px-3 rounded-full text-sm font-bold text-white ${
              task?.status === STATUS.COMPLETED ? "bg-green-500" : "bg-red-500"
            }`}>{task?.status}</p> */}
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-[#1C398E] text-white px-4 py-2 rounded-md hover:bg-[#142A6E] transition"
        >
          Cancel
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(userFormSubmitHandler)}>
        {/* Task Status */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Task Status</label>
          <select
            {...register("status",{
            required:{
                value:true,
                message:"Status is required"
            }
            })}
            defaultValue={getStatus(task) ? getStatus(task) : STATUS.PENDING}
            id="status"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          >
            {
              Object.values(STATUS).map((ws,index)=>{
                  return <option key={index} value={ws}>
                          {ws}
                      </option>
              })
            }
          </select>
        </div>

        {/* Task Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Description</label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Client Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Client Name</label>
          <input
            type="text"
            {...register("clientName", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Task Deadline</label>
          <input
            type="text"
            {...register("deadline", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Steps Table */}
        {
          editTask && 
          <div>
            
              {steps && steps?.length > 0 && (
                <div className="w-full py-4 overflow-x-auto">
                  <p className="font-semibold text-gray-700">Steps:</p>
                  <table className="w-full border border-gray-200 mt-2">
                    <thead className="bg-[#1C398E] text-white">
                      <tr>
                        <th className="p-2 border">Sno</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Assigned To</th>
                        <th className="p-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {steps?.map((st, id) => (
                        <tr key={id} className="text-center">
                          <td className="p-2 border">{id + 1}</td>
                          <td className="p-2 border">{st?.name}</td>
                          <td className="p-2 border">{st?.description}</td>
                          <td className="p-2 border">{getAssignedName(st?.assignedTo)}</td>
                          <td className="p-2 border">
                            <button
                              type="button"
                              onClick={() => {
                                setStep(st);
                                setEditStep(st);
                              }}
                              className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mr-2"
                            >
                              Edit
                            </button>
                            {
                              // st?.status === STATUS.PENDING &&
                              // <button
                              //   type="button"
                              //   className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                              // >
                              //   Delete
                              // </button>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        }

        {/* Add New Step Section */}
        {
          editTask &&      
          <div className="flex flex-col gap-3 border-t pt-4">
            <p className="font-semibold text-gray-700">Add New Step</p>
            <div className="flex flex-wrap gap-4 items-end">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <input
                  type="text"
                  name="name"
                  value={step?.name}
                  onChange={stepInputChangeHandler}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
                />
                {!step?.name && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <input
                  type="text"
                  name="description"
                  value={step?.description}
                  onChange={stepInputChangeHandler}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
                />
                {!step?.description && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </label>

              {/* Assigned To */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Assign To</label>
                <select
                  onChange={stepInputChangeHandler}
                  value={step ? step?.assignedTo : members && members[0]?._id}
                  name="assignedTo"
                  id="assignedTo"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
                >
                  {
                    members &&
                    members.map(mem=>{
                      return <option key={mem?._id} value={mem?._id}>
                          {mem?.name}
                      </option>
                    })
                  }
                </select>
              </div>
              
              {/* Step Status */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  onChange={stepInputChangeHandler}
                  // defaultValue={getStatus(step) ? getStatus(step) : STATUS.PENDING}
                  value={step ? step?.status : STATUS.PENDING}
                  name="status"
                  id="status"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
                >
                  {
                    Object.values(STATUS).map((ws,index)=>{
                        return <option key={index} value={ws}>
                                {ws}
                            </option>
                    })
                  }
                </select>
              </div>
              <button
                type="button"
                onClick={addStepInTask}
                className="px-4 py-2 self-cente bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                {
                  editStep ? "Save Changes" : "Add Step"
                }
              </button>
            </div>
          </div>
        }

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#1C398E] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition self-start"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};
