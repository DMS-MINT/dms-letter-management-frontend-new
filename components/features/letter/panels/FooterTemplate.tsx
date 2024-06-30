import React from "react";
import { ILetterDetails } from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { v4 as uuidv4 } from "uuid";

interface FooterTemplateProps {
  letterDetails: ILetterDetails;
}

const FooterTemplate: React.FC<FooterTemplateProps> = ({ letterDetails }) => {
  return (
    <>
      <style>
        {`
          .print-template {
            padding: 0.25rem 4rem 0 4rem;
            margin: 0 1rem;
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
          .items-center {
            align-items: center;
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
          .w-[20px] {
            width: 20px;
          }
          .h-[20px] {
            height: 20px;
          }
          .w-[50px] {
            width: 50px;
          }
          .h-[50px] {
            height: 50px;
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
            .w-10 {
            width: 10rem;
        }
        .h-10 {
            height: 10rem;
        } 
            .w-6 {
          width: 9rem;
        }
        .h-6 {
          height: 6rem;
        }
        `}
      </style>
      <div className="print-template">
        <div className="flex justify-between">
          <div
            className="pt-1 flex-col pb-6 font-serif w-60"
            style={{ lineHeight: "1" }}
          >
            <div>
              <p>እንዲያውቁት:-</p>
              <ul className="pl-5">
                {letterDetails?.participants
                  .filter(
                    (participant) =>
                      participant.role ===
                      ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"]
                  )
                  .map((participant) => (
                    <li key={uuidv4()}>
                      ለ{" "}
                      {participant.user.user_type === "member"
                        ? participant.user.job_title
                        : participant.user.name}
                    </li>
                  ))}
              </ul>
              <p>ግልባጭ:-</p>
              <ul className="pl-5">
                {letterDetails?.participants
                  .filter(
                    (participant) =>
                      participant.role ===
                      ParticipantRolesEnum["CARBON COPY RECIPIENT"]
                  )
                  .map((participant) => (
                    <li key={uuidv4()}>
                      ለ{" "}
                      {participant.user.user_type === "member"
                        ? participant.user.job_title
                        : participant.user.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <img src="/image/Type=2.svg" alt="Logo 1" className="w-10 h-10" />
            <img
              src="/image/signature1.svg"
              alt="Signature"
              className="w-6 h-6"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTemplate;
