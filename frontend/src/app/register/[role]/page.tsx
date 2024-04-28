import React from 'react';
import SignUpForm from '@/components/SignUpForm';

function SignUpPage({params}:{params:{role:string}}) {
  return (
    <div>
      <SignUpForm role={params.role}/>
    </div>
  );
}

export default SignUpPage;