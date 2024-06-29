import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ParticipantRolesEnum } from "@/typing/enum";
import { ILetterDetails } from "@/typing/interface";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";

const FooterTemplate: React.FC = () => {
  const letterDetails = useAppSelector(selectLetterDetails);
  return (
    <>
      <div>
        <div className="flex justify-center mt-5">
          <div className="flex justify-center">
            <img
              src="/image/Type=2.svg"
              alt="Logo 1"
              className="w-[132px] h-[132px] mr-24"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="/image/signature1.svg"
              alt="Logo 1"
              className="w-[132px] h-[132px] ml-44"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTemplate;
