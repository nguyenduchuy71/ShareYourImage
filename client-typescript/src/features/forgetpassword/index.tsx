import React, { useState } from 'react'
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

function ForgetPassword({ open, setOpen }) {
    const [value, setValue] = useState("")
    return (
        <React.Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Input your OTP code</SheetTitle>
                    </SheetHeader>
                    <div className="flex justify-center items-center">
                        <div className="space-y-2">
                            <InputOTP
                                maxLength={6}
                                value={value}
                                onChange={(value) => setValue(value)}
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
                    <SheetFooter>
                        <Button className="my-2">Send OTP</Button>
                        <Button className="my-2">Submit</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </React.Fragment>
    )
}

export default ForgetPassword