import { useContext } from "react";
import { useFormContext } from "../page";

export default function Input({ label, name, validation, type = "text" }) {
  const { register, formState: { errors } } = useContext(useFormContext);
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
