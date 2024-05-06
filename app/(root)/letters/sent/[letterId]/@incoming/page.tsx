import { Main } from "@/components/layouts";
import CommentSection from "@/components/layouts/Comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MoveDown, MoveUp, ChevronsUpDown } from "lucide-react";
import { title } from "process";

export default function LetterDetail() {
  const readOnly: boolean = true;
  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <Main>
        <section className="flex flex-col gap-5">
          <section className="flex flex-col gap-5">
            <h2 className="font-semibold text-lg">የ ደብዳቤው ተሳታፊወች</h2>
            <div className="grid-flow-row grid-cols-1 gap-5 box-border shadow-lg  p-4">
              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="የተቀባይ ስም">
                  ከ
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="አማረ ተፈሪ "
                  className="w-full mb-2"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="የተቀባይ ስም">
                  ለ
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="የገበያ ስራ አስኪያጅ"
                  className="w-full mb-2"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="ግልባጭ">
                  ግልባጭ
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  value="የዲጂታል ኢኮኖሚ ልማት ክፍል"
                  id="ግልባጭ"
                  className="w-full mb-2"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="ግልባጭ">
                  እንዲያዉቁት
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  value="የዲጂታል ኢኮኖሚ ልማት ክፍል"
                  id="ግልባጭ"
                  className="w-full mb-2"
                />
              </div>
            </div>
          </section>
        </section>
      </Main>

      <Main>
        <section>
          <h2 className="font-semibold text-lg">ስለ ደብዳቤው መረጃ</h2>
          <div className="grid grid-cols-2 gap-5  mt-5">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="የተቀባይ ስም">ጉዳይ</Label>
              <Input
                disabled={readOnly}
                type="text"
                id="የተቀባይ ስም"
                value="አማረ ተፈሪ "
              />
            </div>

            <div className="grid items-center gap-1.5">
              <Label htmlFor="የተቀባይ ስም">የገፆች ብዛት</Label>
              <Input disabled={readOnly} type="text" id="የተቀባይ ስም" />
            </div>
          </div>
        </section>
      </Main>

      <CommentSection comments={[]} />
    </section>
  );
}
