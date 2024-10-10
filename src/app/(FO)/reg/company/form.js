import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { companyJoin } from '../action/RegAction';
import JoinButton from '../component/JoinButton';
import Section from '../component/Section';
import CompanyForm from '../component/form/CompanyForm';
import CompanyManagerForm from '../component/form/CompanyManagerForm';
import TermsAgreementForm from '../component/form/TermsAgreementForm';
import UserForm from '../component/form/UserForm';

export default function CompanyReg() {

  const [emailDuplicateCheck, setEmailDuplicate] = useState(false);
  const { handleSubmit, reset } = useFormContext();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (emailDuplicateCheck) {
      const result = await companyJoin(data);
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
      <Section title="기업회원 기본정보">
        <CompanyForm />
      </Section>
      <Section title="기업 인사담당자 정보">
        <CompanyManagerForm />
      </Section>
      <TermsAgreementForm />
      <JoinButton />
    </form>
  );
}