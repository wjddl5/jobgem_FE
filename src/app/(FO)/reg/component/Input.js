import { useFormContext } from "react-hook-form";

export default function Input({ label, name, validation, type = "text" }) {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="mb-4">
        <input
            type={type}
            {...register(name, validation)}
            className="w-full px-3 py-2 border rounded"
            placeholder={`${label}`}
        />
        {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  )
}
