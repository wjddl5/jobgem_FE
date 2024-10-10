import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from "react-hook-form";
import toast from 'react-hot-toast';
import { personalJoin } from '../action/RegAction';
import JoinButton from '../component/JoinButton';
import Section from '../component/Section';
import PersonalForm from '../component/form/PersonalForm';
import TermsAgreementForm from '../component/form/TermsAgreementForm';
import UserForm from '../component/form/UserForm';
export default function PersonalReg() {

  const [emailDuplicateCheck, setEmailDuplicate] = useState(false);
  const { handleSubmit, reset } = useFormContext();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (emailDuplicateCheck) {
      const result = await personalJoin(data);
      if (result == "회원가입 성공") {
        alert("회원가입 완료!");
        router.push('/login');
        reset();
      }
      toast.error(result);
    } else {
      toast.error("이메일 중복 체크가 필요합니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section title="로그인 정보">
        <UserForm setEmailDuplicateCheck={setEmailDuplicate} />
      </Section>
      <Section title="개인회원 정보">
        <PersonalForm />
      </Section>
      <TermsAgreementForm />
      <JoinButton />
    </form>
  );
}