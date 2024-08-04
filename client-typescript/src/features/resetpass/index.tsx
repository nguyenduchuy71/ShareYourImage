import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function ResetPassword() {
    const navigate = useNavigate();
    return (
        <div className="w-full flex justify-center py-10 px-4">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-[#1d1d1d]">New password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input placeholder="Password" />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Update</Button>
                    <Button variant="destructive" onClick={() => navigate('/')}>Back</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ResetPassword