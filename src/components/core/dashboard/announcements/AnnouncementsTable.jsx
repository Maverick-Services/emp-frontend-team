import { useNavigate } from "react-router-dom";
import { formattedFullDate } from "../../../../utils/dateFormatter";

const AnnouncementsTable = ({ announcements }) => {
    const navigate = useNavigate();

    return (
        <div className="overflow-x-auto w-full rounded-md border border-blue-900">
            <table className="min-w-full">
                <thead className="bg-blue-900 text-white font-bold">
                    <tr>
                        <th className="px-4 py-3 text-left tracking-wider">
                            Subject
                        </th>
                        <th className="px-4 py-3 text-left tracking-wider">
                            Description
                        </th>
                        <th className="px-4 py-3 text-left tracking-wider">
                            Role
                        </th>
                        <th className="px-4 py-3 text-left tracking-wider">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {announcements.map((announcement) => (
                        <tr
                            key={announcement._id}
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/dashboard/announcements/${announcement._id}`)}
                        >
                            <td className="px-4 py-4 whitespace-nowrap text-blue-900 font-semibold text-lg">
                                {announcement.subject}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                {announcement.description.slice(0, 50)}...
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                {announcement.role}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                {formattedFullDate(announcement.createdAt)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementsTable;
