'use client'
import { useForm } from 'react-hook-form';

export default function PersonalReg() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700">아이디</label>
        <input
          {...register("username", { required: "아이디를 입력해주세요" })}
          className="w-full px-3 py-2 border rounded"
          placeholder="아이디를 입력하세요"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">비밀번호</label>
        <input
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요" })}
          className="w-full px-3 py-2 border rounded"
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      {/* 다른 필드들도 비슷한 방식으로 변경 */}

      {/* 다른 필드들 계속 */}

      <div className="mb-4">
        <label className="block text-gray-700">
          <input
            type="checkbox"
            {...register("agreement", { required: "개인정보 수집 및 이용에 동의해주세요" })}
            className="mr-2"
          />
          개인정보 수집 및 이용에 동의합니다.
        </label>
        {errors.agreement && <p className="text-red-500">{errors.agreement.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        가입하기
      </button>
    </form>
  );
}