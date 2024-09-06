import { useContext } from 'react';
import { personalJoin } from '../action/RegAction';
import JoinButton from '../component/JoinButton';
import Section from '../component/Section';
import PersonalForm from '../component/form/PersonalForm';
import TermsAgreementForm from '../component/form/TermsAgreementForm';
import UserForm from '../component/form/UserForm';
import { useFormContext } from '../page';

export default function PersonalReg() {

  const { handleSubmit, reset } = useContext(useFormContext);

  const onSubmit = (data) => {
    personalJoin(data);
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