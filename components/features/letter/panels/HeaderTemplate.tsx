import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ParticipantRolesEnum } from "@/typing/enum";
import { ILetterDetails } from "@/typing/interface";

interface PrintTemplateProps {
  content: ILetterDetails;
}

const PrintTemplate: React.FC<PrintTemplateProps> = ({ content }) => {
  return (
    <>
      {content?.letter_type === "internal" && (
        <div className="print-template">
          <header className="flex justify-center items-center mb-4">
            <img src="/image/Type=1.svg" alt="Logo 1" className="w-60 h-36" />
          </header>
          <hr className="mb-4 border-b-1 border-black" />
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">ቁጥር</p>
            <h1>{content.reference_number}</h1>
            <p className="text-sm text-gray-600">ቀን</p>
            <h1>{new Date(content.created_at).toLocaleDateString()}</h1>
          </div>
          <p>From</p>
          <h1>{content.owner.full_name}</h1>
          <br />
          <p>ለ</p>
          {content.participants
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
            <h1>{content.subject}</h1>
          </span>
        </div>
      )}
    </>
  );
};

export default PrintTemplate;
