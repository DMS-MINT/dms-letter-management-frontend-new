import { ParticipantRolesEnum } from "@/typing/enum";
import {
  ILetterDetails,
  ILetterUpdateSerializer,
  IParticipantOutputSerializer,
} from "@/typing/interface";

const updateLetterSerializer = (
  letterDetails: ILetterDetails
): ILetterUpdateSerializer => {
  //@ts-ignore
  const participants: IParticipantOutputSerializer[] =
    letterDetails.participants.map((participant) => ({
      id: participant.id,
      user: participant.user,
      role: ParticipantRolesEnum[
        participant.role.toUpperCase() as keyof typeof ParticipantRolesEnum
      ],
    }));

  const subject = letterDetails.subject ? letterDetails.subject : undefined;
  const content = letterDetails.content ? letterDetails.content : undefined;

  return {
    ...(subject && { subject }),
    ...(content && { content }),
    participants,
  };
};

export default updateLetterSerializer;
