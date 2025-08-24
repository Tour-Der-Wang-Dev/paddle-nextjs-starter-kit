'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { login, loginAnonymously } from '@/app/login/actions';
import { useState, useTransition } from 'react';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleAnonymousLogin() {
    startTransition(async () => {
      try {
        const result = await loginAnonymously();
        if (result?.error) {
          toast({ description: 'Something went wrong. Please try again', variant: 'destructive' });
        }
      } catch (error) {
        toast({ description: 'Something went wrong. Please try again', variant: 'destructive' });
      }
    });
  }

  async function handleLogin(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await login(formData);
        if (result?.error) {
          toast({ description: result.error, variant: 'destructive' });
        }
      } catch (error) {
        toast({ description: 'Something went wrong. Please try again', variant: 'destructive' });
      }
    });
  }

  return (
    <div className={'px-6 md:px-16 pb-6 py-8 gap-6 flex flex-col items-center justify-center'}>
      <Image src={'/assets/icons/logo/aeroedit-icon.svg'} alt={'AeroEdit'} width={80} height={80} />
      <div className={'text-[30px] leading-[36px] font-medium tracking-[-0.6px] text-center'}>
        Log in to your account
      </div>
      <Button
        onClick={handleAnonymousLogin}
        type={'button'}
        variant={'secondary'}
        className={'w-full mt-6'}
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Log in as Guest'}
      </Button>
      <div className={'flex w-full items-center justify-center'}>
        <Separator className={'w-5/12 bg-border'} />
        <div className={'text-border text-xs font-medium px-4'}>or</div>
        <Separator className={'w-5/12 bg-border'} />
      </div>
      <form action={handleLogin} className={'w-full flex flex-col gap-6'}>
        <AuthenticationForm
          email={email}
          onEmailChange={(email) => setEmail(email)}
          password={password}
          onPasswordChange={(password) => setPassword(password)}
        />
        <Button type={'submit'} variant={'secondary'} className={'w-full'} disabled={isPending}>
          {isPending ? 'Signing in...' : 'Log in'}
        </Button>
      </form>
    </div>
  );
}
