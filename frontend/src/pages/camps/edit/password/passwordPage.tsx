import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import SubmitButton from '../../../../components/button/submitButton';
import Input from '../../../../components/input/input';
import Text from '../../../../components/text/text';

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  const changePasswordMutation = useMutation({
    mutationFn: (passwords: ChangePassword) =>
      fetch(`/api/users/`, {
        method: 'patch',
        body: JSON.stringify(passwords),
      }).then((res) => res.json()),
  });

  const handleChangePassword = (event: FormEvent) => {
    event.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      return;
    }
    const passwords = { currentPassword, newPassword };
    changePasswordMutation.mutate(passwords);
  };

  return (
    <div className="flex flex-col gap-xl pl-[10rem] pr-[10rem]">
      <Text size={20} className="text-center">
        비밀번호 변경
      </Text>
      <form className="flex flex-col gap-lg" onSubmit={handleChangePassword}>
        <Input
          label="기존 비밀번호"
          type="password"
          defaultValue={currentPassword}
          setValue={setCurrentPassword}
          placeholder="기존의 비밀번호를 입력해주세요."
        />
        <Input
          label="새로운 비밀번호"
          type="password"
          defaultValue={newPassword}
          setValue={setNewPassword}
          placeholder="새로운 비밀번호를 입력해주세요."
        />
        <Input
          label="새로운 비밀번호 확인"
          type="password"
          defaultValue={newPasswordConfirm}
          setValue={setNewPasswordConfirm}
          placeholder="새로운 비밀번호를 다시 입력해주세요."
        />
        <SubmitButton
          text="비밀번호 변경"
          isPending={changePasswordMutation.isPending}
          isError={changePasswordMutation.isError}
          isSuccess={changePasswordMutation.isSuccess}
        />
      </form>
    </div>
  );
}

export default PasswordPage;