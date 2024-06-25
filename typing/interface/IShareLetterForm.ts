export type PermissionType =
  | "can_view_letter"
  | "can_update_letter"
  | "can_comment_letter"
  | "can_share_letter";

export interface IShareLetterFormData {
  to: string[];
  message: string;
  permissions: PermissionType[];
}
