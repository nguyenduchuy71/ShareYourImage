import React, { useState, useTransition, useEffect, FormEvent } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase/config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

function ForgetPassword({ open, setOpen }) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState("")
    const [otp, setOtp] = useState("")
    const [success, setSuccess] = useState("")
    const [resendCountdown, setResendCountdown] = useState(0)
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();

    const loadingIndicator = (
        <div role="status" className="flex justify-center">
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [resendCountdown])

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible"
            }
        )
        setRecaptchaVerifier(recaptchaVerifier)
        return () => {
            recaptchaVerifier.clear()
        }
    }, [auth])

    useEffect(() => {
        const hasEnteredAllDigits = otp.length === 6;
        if (hasEnteredAllDigits) {
            verifyOtp();
        }
    }, [otp]);

    const verifyOtp = async () => {
        setError("");
        try {
            await confirmationResult?.confirm(otp);
            if (!confirmationResult) {
                startTransition(() => {
                    setError("Please request OTP first.");
                    return;
                });
            }
            navigate('/resetpassword')
        } catch (error) {
            startTransition(() => {
                if (!confirmationResult) {
                    setError("Failed to verify OTP. Please check the OTP.");
                    return;
                }
            });
        }
    };

    const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setResendCountdown(60);
        setError('');

        if (!recaptchaVerifier) {
            return setError('RecaptchaVerifier is not initialized.');
        }

        try {
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptchaVerifier
            );

            startTransition(() => {
                setConfirmationResult(confirmationResult);
                setSuccess('OTP sent successfully.');
            });
        } catch (err: any) {
            startTransition(() => {
                setResendCountdown(0);
                if (err.code === 'auth/invalid-phone-number') {
                    setError('Invalid phone number. Please check the number.');
                } else if (err.code === 'auth/too-many-requests') {
                    setError('Too many requests. Please try again later.');
                } else {
                    setError('Failed to send OTP. Please try again.');
                }
            });
        }
    };
    return (
        <React.Fragment>
            <div id='recaptcha-container'></div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Input your OTP code</SheetTitle>
                    </SheetHeader>
                    {confirmationResult && (
                        <div className="flex justify-center items-center">
                            <div className="space-y-2">
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={(value) => setOtp(value)}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot className='border border-slate-300' index={0} />
                                        <InputOTPSlot className='border border-slate-300' index={1} />
                                        <InputOTPSlot className='border border-slate-300' index={2} />
                                        <InputOTPSlot className='border border-slate-300' index={3} />
                                        <InputOTPSlot className='border border-slate-300' index={4} />
                                        <InputOTPSlot className='border border-slate-300' index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </div>
                    )}

                    <div className='my-2'>
                        {!confirmationResult && (
                            <form onSubmit={requestOtp}>
                                <Input className="text-black"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </form>
                        )}
                    </div>
                    <SheetFooter>
                        <Button disabled={!phoneNumber || isPending || resendCountdown > 0}
                            onClick={() => requestOtp()}
                            className="my-2">
                            {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}`
                                : isPending ? 'Sending OTP' : 'Send OTP'}
                        </Button>
                    </SheetFooter>
                    <div className="mt-4 text-center">
                        {error && <p className='text-red-500'>{error}</p>}
                        {success && <p className='text-green-500'>{success}</p>}
                    </div>
                    {isPending && loadingIndicator}
                </SheetContent>
            </Sheet>
        </React.Fragment>
    )
}

export default ForgetPassword