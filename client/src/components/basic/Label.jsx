export const Label = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor} className="block mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);
