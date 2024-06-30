import React from "react";
import { ILetterDetails } from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { v4 as uuidv4 } from "uuid";

interface HeaderOutgoingTemplateProps {
  letterDetails: ILetterDetails;
}

const HeaderOutgoingTemplate: React.FC<HeaderOutgoingTemplateProps> = ({
  letterDetails,
}) => {
  return (
    <>
      <style>
        {`
          .print-template {
            padding-top: 0.25rem;
            margin-left: 1rem;
            margin-top: 1rem;
            margin-right: 1rem;
            padding-right: 4rem;
            padding-left: 4rem;
            padding-bottom: 0rem;
            font-family: Arial, sans-serif;
          }
          .underline {
            text-decoration-line: underline;
          }
          .flex-col {
            display: flex;
            flex-direction: column;
          }
          .flex {
            display: flex;
          }
          .justify-center {
            justify-content: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .items-center {
            align-items: center;
          }
          .items-end {
            align-items: flex-end;
          }
          .gap-0 {
            gap: 0;
          }
          .gap-1 {
            gap: 0.25rem;
          }
          .gap-2 {
            gap: 0.5rem;
          }
          .w-4 {
            width: 4rem;
          }
          .h-4 {
            height: 4rem;
          }
          .h-5 {
            height: 5rem;
          }
          .w-5 {
            width: 5rem;
          }
          .w-6 {
            width: 9rem;
          }
          .h-6 {
            height: 6rem;
          }
          .w-60 {
            width: 20rem;
          }
          .h-36 {
            height: 9rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .pt-4 {
            padding-top: 1rem;
          }
          .pt-5 {
            padding-top: 1.25rem;
          }
          .pt-10 {
            padding-top: 2.5rem;
          }
          .pb-6 {
            padding-bottom: 1.5rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .text-md {
            font-size: 1rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
          .text-center {
            text-align: center;
          }
          .font-serif {
            font-family: Georgia, serif;
          }
          .font-mono {
            font-family: Menlo, monospace;
          }
          .text-gray-600 {
            color: #4a5568;
          }
          .font-light {
            font-weight: 300;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .w-[50px] {
            width: 50px;
          }
          .h-[50px] {
            height: 50px;
          }
          .w-[100px] {
            width: 100px;
          }
          .h-[100px] {
            height: 100px;
          }
          .w-[132px] {
            width: 132px;
          }
          .h-[132px] {
            height: 132px;
          }
          .mt-2 {
            margin-top: 1rem;
          }
          .pl-5 {
            padding-left: 2rem;
          }
          .pr-5 {
            padding-right: 2rem;
          }
          .pl-1 {
            padding-left: 0.25rem;
          }
          .line-height-05 {
            line-height: 0.5cm;
          }
          .font-bold {
            font-weight: bold;
          }
          .z-5 {
            z-index: 5;
          }
          .z-0 {
            z-index: 0;
          }
        
        `}
      </style>

      <div className="print-template">
        <header className="flex justify-between items-center mb-4">
          <img src="/image/star.png" alt="Logo 1" className="w-5 h-5" />

          <div
            className="items-center w-full font-serif"
            style={{ lineHeight: "0.75" }}
          >
            <h2 className="text-xl font-bold text-gray-800 text-center">
              በ ኢትዮጲያ ፌደረላዊ ሪፐብሊክ
            </h2>
            <h2 className="text-lg font-bold text-gray-800 text-center">
              የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር
            </h2>
            <p className="text-sm text-gray-600 text-center">
              The Federal Democratic Republic of Ethiopia
            </p>
            <p className="text-sm text-gray-600 text-center">
              Minister of Innovation and Technology
            </p>
          </div>

          <img src="/image/innovation.png" alt="Logo 1" className="w-6 h-6" />
        </header>

        <hr className="mb-2 border-b-1 border-black" />

        <div className="flex flex-col items-end pt-2 pr-5 font-serif">
          <div className="flex items-center gap-1 font-serif">
            <div className="line-height-05">
              <p className="text-sm">
                ቁጥር / ref.no:-{" "}
                <span className="pl-1 underline">
                  {" "}
                  {letterDetails.reference_number}
                </span>
              </p>
              <p className="text-sm">
                ቀን / Date:-{" "}
                <span className="pl-1 underline">
                  {new Date(letterDetails.created_at).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col font-serif gap-0 pl-5"
          style={{ lineHeight: "0.25" }}
        >
          {letterDetails?.participants
            .filter(
              (participant) =>
                participant.role === ParticipantRolesEnum["PRIMARY RECIPIENT"]
            )
            .map((participant) => (
              <p key={uuidv4()} className="text-md">
                ለ{" "}
                {participant?.user.user_type === "member"
                  ? participant.user.job_title
                  : participant.user.name}
              </p>
            ))}
          <p className="text-sm underline">አዲስ አበባ</p>
        </div>
        <div className="flex flex-col pt-2 gap-3 font-serif">
          <p className="text-lg text-center">
            ጉዳዩ:- <span className="font-bold">{letterDetails.subject}</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default HeaderOutgoingTemplate;
