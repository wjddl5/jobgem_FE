import Input from "../Input";

export default function PersonalForm() {
  const name_validation = {
    required: "이름을 입력해주세요",
  }

  const tel_validation = {
    required: "전화번호를 입력해주세요",
    pattern: {
      value: /^[0-9]{11}$/,
      message: "올바른 전화번호 형식이 아닙니다.",
    },
  };

  return (
    <div>
      <Input label="이름" name="joName" validation={name_validation} />
      <Input label="전화번호" name="joTel" validation={tel_validation} />
    </div>
  )
}
