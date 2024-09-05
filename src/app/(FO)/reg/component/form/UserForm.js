import Input from "../Input";

export default function UserForm() {
    const email_validation = {
        required: "이메일을 입력해주세요.",
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "올바른 이메일 형태가 아닙니다.",
        }
    }
    const password_validation = {
        required: "비밀번호를 입력해주세요.",
    }

    return (
        <div>
            <Input label="이메일" name="usId" validation={email_validation} />
            <Input type="password" label="비밀번호" name="usPw" validation={password_validation} />
        </div>
    )
}
