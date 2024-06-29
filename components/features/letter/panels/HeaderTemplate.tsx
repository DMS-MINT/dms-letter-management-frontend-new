import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ParticipantRolesEnum } from "@/typing/enum";
import { ILetterDetails } from "@/typing/interface";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";

const HeaderTemplate: React.FC = () => {
  const letterDetails = useAppSelector(selectLetterDetails);
  return (
    <>
      {letterDetails?.letter_type === "internal" && (
        <div className="print-template">
          <header className="flex justify-center items-center mb-4">
            <img src="/image/Type=1.svg" alt="Logo 1" className="w-60 h-36" />
          </header>
          <hr className="mb-4 border-b-1 border-black" />
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">ቁጥር</p>
            <h1>{letterDetails.reference_number}</h1>
            <p className="text-sm text-gray-600">ቀን</p>
            <h1>{new Date(letterDetails.created_at).toLocaleDateString()}</h1>
          </div>
          <p>From</p>
          <h1>{letterDetails.owner.full_name}</h1>
          <br />
          <p>ለ</p>
          {letterDetails?.participants
            .filter(
              (participant) =>
                participant.role === ParticipantRolesEnum["PRIMARY RECIPIENT"]
            )
            .map((participant) => (
              <p key={uuidv4()} className="text-lg text-gray-600">
                {participant.user.user_type === "member"
                  ? participant.user.job_title
                  : participant.user.name}
              </p>
            ))}
          <span>
            <p className="text-lg  text-gray-600 text-center">ጉዳዩ:-</p>
            <h1>{letterDetails.subject}</h1>
          </span>
        </div>
      )}
    </>
  );
};

export default HeaderTemplate;
