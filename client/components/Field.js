export const Field = ({ name, children }) => {
  return (
    <div className="sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
};
