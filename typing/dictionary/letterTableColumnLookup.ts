import { LetterTableColumnEnum } from "../enum/LetterTableColumnEnum";

export const letterTableColumnLookup: Record<LetterTableColumnEnum, string> = {
  [LetterTableColumnEnum.ID]: "የደብዳቤ ቁጥር",
  [LetterTableColumnEnum.REFERENCE_NUMBER]: "የደብዳቤ ቁጥር",
  [LetterTableColumnEnum.HAS_READ]: "የንባብ ሁኔታ",
  [LetterTableColumnEnum.SUBJECT]: "ጉዳዩ",
  [LetterTableColumnEnum.CURRENT_STATE]: "የደብዳቤ ሁኔታ",
  [LetterTableColumnEnum.SENDER]: "ከ",
  [LetterTableColumnEnum.RECIPIENT]: "ለ",
  [LetterTableColumnEnum.RECEIVED_AT]: "የደረሰበት ቀን",
  [LetterTableColumnEnum.LETTER_TYPE]: "የደብዳቤ አይነት",
  [LetterTableColumnEnum.SUBMITTED_AT]: "የተላለፈበት ቀን",
  [LetterTableColumnEnum.PUBLISHED_AT]: "ያከፋፈለበት ቀን",
  [LetterTableColumnEnum.CREATED_AT]: "የተፈጠረበት ቀን",
  [LetterTableColumnEnum.UPDATED_AT]: "የተቀየረበት ቀን",
};
