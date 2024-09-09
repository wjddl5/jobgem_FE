import { useFormContext } from "react-hook-form";

export default function TermsAgreementForm() {
    const { register, formState: { errors } } = useFormContext();

    const agreement_validation = {
        required: "개인정보 수집 및 이용에 동의해주세요",
    }

    return (
        <div className="mb-4">
            <div>
                <label className="block text-gray-700">
                    <input
                        type="checkbox"
                        {...register("agreement", agreement_validation)}
                        className="mr-2"
                    />
                    <span className="text-red-500">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                </label>
                {errors.agreement && <p className="text-red-500">{errors.agreement.message}</p>}
            </div>
        </div>
    )
}
