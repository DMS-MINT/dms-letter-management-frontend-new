/** @format */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baseline, Printer, Dot } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/taginput/TagInput";

export default function ControlPanel() {
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex gap-2">
        <h1 className="page-title">አዲስ ደብዳቤ </h1>
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 "
        >
          <Dot /> አልተቀመጠም
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon">
          <Printer size={20} />
        </Button>
        <Button className="mr-0 border-gray-300 rounded-md" variant="outline">
          ረቂቁን ያስቀምጡ
        </Button>

        <Dialog>
          <DialogTrigger>
            {" "}
            <Button
              className="ml-0 border-gray-300 rounded-md"
              variant="outline"
            >
              ደብዳቤውን ምራ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <section className="flex flex-col gap-5 mx-8">
                  {" "}
                  <h2 className="font-semibold text-lg">የ ደብዳቤ መምሪያ</h2>
                  <div className="grid gap-5">
                    <div className="grid items-center gap-1.5">
                      <Label htmlFor="የተቀባይ ስም">ለ</Label>

                      <TagInput />
                      {/* <Input type="text" id="የተቀባይ ስም" /> */}

                    </div>
                    <div className="grid items-center gap-1.5"></div>
                    <Label htmlFor="የተቀባይ ስም">መልክት ማስቀመጫ</Label>
                    <Textarea id="ደብዳቤ" className="bg-gray-100 h-[100px]" />
                  </div>
                  <Label htmlFor="የተቀባይ ስም" className="mt-7">
                    ፊርማ
                  </Label>
                  <section className="flex flex-col justify-center items-center cursor-pointer hover:backdrop-brightness-95 w-[410px] h-[200px] mt-0 mb-3 bg-gray-100">
                    <p className="text-center text-gray-600">
                      እባክዎን የፊርማ ሰሌዳውን እዚህ ጠቅ ያድርጉ ፊርማዎን ለማስገባት
                      <br /> ወይም
                    </p>
                    <Button
                      className="ml-3 mr-5 border-gray-300 rounded-md"
                      variant="outline"
                    >
                      ቀድሞ የተቀዳ ፊርማ ይጠቀሙ
                    </Button>
                  </section>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      className="ml-3 mr-5 border-gray-300 rounded-md"
                      variant="outline"
                    >
                      {" "}
                      ሰርዝ
                    </Button>
                    <Button
                      className="ml-3 mr-5 border-gray-300 rounded-md"
                      variant="default"
                    >
                      ምራ
                    </Button>
                  </div>
                </section>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <Button variant="default">
            {" "}
            <DialogTrigger>ላክ</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ያረጋግጡ</DialogTitle>
              <DialogDescription>
                እርግጠኛ ነዎት ደብዳቤውን ወደ ማህደር ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">አዎ</Button>
              <Button
                className="bg-white text-black hover:bg-white"
                type="submit"
              >
                አይ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
