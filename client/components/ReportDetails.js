import { ReportStatus } from "/components";
import { MapPinIcon, TagIcon, UserIcon, CalendarIcon } from '@heroicons/react/20/solid'


const DetailField = ({ label, value, icon }) => {
  return (
    <div className="py-1 sm:grid sm:grid-cols-3 sm:py-2 ">
    <dt className="text-sm flex font-medium text-gray-500 mr-2">
      <div className="grow">{label}</div>
      {icon ? 
      <div className="h-5 w-5 text-gray-400 ml-2" aria-hidden="true">
        {icon}
      </div>
      : null}
    </dt>
    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
  </div>)}

export const ReportDetails = ({ report }) => {
  return (
    <dl className="sm:divide-y sm:divide-gray-200 mr-10">
      <DetailField label="Title" value={report.title} />
      <DetailField label="Description" value={report.description} />
      <DetailField label="Category" value={report.category?.name} icon={<TagIcon />} />
      <DetailField label="Location" value={report.location?.name} icon={<MapPinIcon />} />
      <DetailField label="Submitted By" value={report.user?.username} icon={<UserIcon />} />
      <DetailField label="Submitted At" value={report.created_at_fmt} icon={<CalendarIcon />} />
      {
        report.corrective_action ?
        <DetailField label="Corrective Action" value={report.corrective_action} /> : null
      }
      {
        report.final_action ?
        <DetailField label="Final Action" value={report.final_action} /> : null
      }
      <DetailField label="Status" value={<ReportStatus report={report} />} />

    </dl>
  )
}