import Input from "../Input";

export default function CompanyManagerForm() {
    const coManagerName_validation = {
        required: "인사담당자 이름을 입력해주세요",
    }

    const coManagerTel_validation = {
        required: "인사담당자 전화번호를 입력해주세요",
        pattern: {
          value: /^[0-9]{11}$/,
          message: "올바른 전화번호 형식이 아닙니다.",
        },
      }
    return (
        <div>
            <Input label="인사담당자 이름" name="managerName" validation={coManagerName_validation} />
            <Input label="인사담당자 전화번호" name="managerTel" validation={coManagerTel_validation} />
        </div>
    );
}
