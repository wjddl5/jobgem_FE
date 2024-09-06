export default function Section({title, children}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2 text-2xl">{title}</label>
      <div className="border border-gray-300  pt-4 px-4 bg-blue-50">
        {children}
      </div>
    </div>
  )
}
