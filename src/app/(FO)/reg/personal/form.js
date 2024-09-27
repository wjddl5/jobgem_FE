import { useRouter } from 'next/navigation';
import { useFormContext } from "react-hook-form";
import { personalJoin } from '../action/RegAction';
import JoinButton from '../component/JoinButton';
import Section from '../component/Section';
import PersonalForm from '../component/form/PersonalForm';
import TermsAgreementForm from '../component/form/TermsAgreementForm';
import UserForm from '../component/form/UserForm';
export default function PersonalReg() {

  const { handleSubmit, reset } = useFormContext();
  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await personalJoin(data);
    if(result == "회원가입 성공") {
      router.push('/login');
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section title="로그인 정보">
        <UserForm/>
      </Section>
      <Section title="개인회원 정보">
        <PersonalForm/>
      </Section>
      <TermsAgreementForm/>
      <JoinButton/>
    </form>
  );
}