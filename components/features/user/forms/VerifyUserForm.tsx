import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getDefaultSignature } from "@/lib/features/authentication/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";

export default function VerifyUserForm() {
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(getDefaultSignature(password));
    setPassword("")
  };

  return (
    <Dialog>
      <DialogTrigger className="mr-auto">
        <Button className="bg-gray-600 hover:bg-gray-500 mr-auto">
          አስቀድሞ የተቀመጠ ፊርማ ይጠቀሙ
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30rem] max-w-[30rem] ">
        <DialogHeader className="gap-2">
          <DialogTitle>ነባር ፊርማዎን ይጠቀሙ</DialogTitle>
          <DialogDescription>
            እባክዎ ማንነትዎን ለማረጋገጥ እና ነባሪ ፊርማዎን ለመጠቀም የይለፍ ቃልዎን ያስገቡ።
          </DialogDescription>
          <Input
            placeholder="የይለፍ ቃልዎን ያስገቡ"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-white text-black hover:bg-white">አይ</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              disabled={password ? false : true}
              type="submit"
              onClick={handleSubmit}
            >
              አዎ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
