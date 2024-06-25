import {
  ILetterCreateSerializer,
  ILetterDetails,
  IParticipantOutputSerializer,
} from "@/typing/interface";

const createLetterSerializer = (
  letterDetails: ILetterDetails
): ILetterCreateSerializer => {
  //@ts-ignore
  const participants: IParticipantOutputSerializer[] =
    letterDetails.participants.map((participant) => {
      if (participant.user.user_type === "member") {
        return {
          user: {
            id: participant.user.id,
            user_type: "member",
          },
          role: participant.role,
        };
      } else if (participant.user.user_type === "guest") {
        return {
          user: {
            id: participant.user.name,
            name: participant.user.name,
            user_type: "guest",
          },
          role: participant.role,
        };
      } else {
        return null;
      }
    });

  const subject = letterDetails.subject ? letterDetails.subject : undefined;
  const content = letterDetails.content ? letterDetails.content : undefined;

  return {
    ...(subject && { subject }),
    ...(content && { content }),
    participants,
    letter_type: letterDetails.letter_type,
  };
};

export default createLetterSerializer;
