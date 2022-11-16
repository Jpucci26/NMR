import { useQuery } from "react-query";
import { ChatBubbleLeftEllipsisIcon, BackwardIcon, PencilSquareIcon, ForwardIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'


const LongNote = ({ note, icon, title }) => {

    return <>
        <div className="relative">
            <img
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                src={note.user.avatar}
                alt=""
            />

            <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                <div className="h-5 w-5 text-gray-400" aria-hidden="true" >
                    {icon}
                </div>
            </span>
        </div>
        <div className="min-w-0 flex-1">
            <div>
                <div className="text-sm">
                    <span className="font-medium text-gray-900">
                        {note.user.username} ({note.user.title})
                    </span>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">{title || note.task} - {note.created_at_fmt}</p>
            </div>
            <div className="mt-2 text-sm text-gray-700">
                <p>{note.body}</p>
            </div>
        </div>
    </>
}



export const ReportNotes = ({ report }) => {
    const getNotes = async () => {
        const res = await fetch(`/api/reports/${report.id}/notes`);
        return res.json();
    };

    const { data } = useQuery({
        queryKey: `reports/${report.id}/notes`,
        queryFn: getNotes,
        enabled: report.id !== undefined,
    });

    if (!data || data.error) return <>Error getting notes.</>;

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {data.map((note, noteIdx) => (
                    <li key={note.id}>
                        <div className="relative pb-8">
                            {noteIdx !== data.length - 1 ? (
                                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex items-start space-x-3">
                                {note.task === 'Clarify' ? (
                                    <LongNote note={note} icon={<PencilSquareIcon />} title="Edited Report" />
                                ) : note.task === 'Reverted' ? (
                                    <LongNote note={note} icon={<BackwardIcon />} title="Reverted Report" />
                                ) : note.task === 'Comment' ? (
                                    <LongNote note={note} icon={<ChatBubbleLeftEllipsisIcon />} />
                                ) : note.task === 'Recorded Corrective Action' ? (
                                    <LongNote note={note} icon={<ForwardIcon/>} />
                                ) : note.task === 'Closed Report' ? (
                                    <LongNote note={note} icon={<CheckBadgeIcon />} />
                                ) : null}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}