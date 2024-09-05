import { companyJoin } from '@/app/action/UserAction';
import { useContext } from 'react';
import JoinButton from '../component/JoinButton';
import Section from '../component/Section';
import CompanyForm from '../component/form/CompanyForm';
import CompanyManagerForm from '../component/form/CompanyManagerForm';
import TermsAgreementForm from '../component/form/TermsAgreementForm';
import UserForm from '../component/form/UserForm';
import { useFormContext } from '../page';

export default function CompanyReg() {
  const { handleSubmit, reset } = useContext(useFormContext);
  
  const onSubmit = (data) => {
    companyJoin(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section title="로그인 정보">
        <UserForm/>
      </Section>
      <Section title="기업회원 기본정보">
        <CompanyForm/>
      </Section>
      <Section title="기업 인사담당자 정보">
        <CompanyManagerForm/>
      </Section>
      <TermsAgreementForm/>
      <JoinButton/>
    </form>
  );
}