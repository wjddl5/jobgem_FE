import Input from "../Input";

export default function CompanyForm() {

  const coName_validation = {
    required: "기업명을 입력해주세요",
  }
  const coAddress_validation = {
    required: "기업주소를 입력해주세요",
  }
  const coTel_validation = {
    required: "기업 대표 전화번호를 입력해주세요",
    pattern: {
      value: /^[0-9]{11}$/,
      message: "올바른 전화번호 형식이 아닙니다.",
    },
  }
  const coNumber_validation = {
    required: "사업자 등록번호를 입력해주세요",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "올바른 사업자 등록번호 형식이 아닙니다.",
    },
  }
  const coType_validation = {
    required: "기업 유형을 입력해주세요",
  }

  return (
    <div>
      <Input label="기업명" name="name" validation={coName_validation} />
      <Input label="기업주소" name="address" validation={coAddress_validation} />
      <Input label="기업 대표 전화번호" name="tel" validation={coTel_validation} />
      <Input label="사업자 등록번호" name="number" validation={coNumber_validation} />
      <Input label="기업 유형" name="type" validation={coType_validation} />
    </div>
  )
}
