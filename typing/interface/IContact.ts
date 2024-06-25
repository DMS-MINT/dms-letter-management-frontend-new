export interface IMember {
  id: string;
  full_name: string;
  job_title: string;
  user_type: "member";
}

export interface IGuest {
  id: string;
  name: string;
  user_type: "guest";
}

export interface IMemberCreateSerializer {
  id: string;
  user_type: "member";
}
export interface IGuestCreateSerializer {
  id: string;
  name: string;
  user_type: "guest";
}

export type UserCreateSerializer =
  | IMemberCreateSerializer
  | IGuestCreateSerializer;

export type ContactType = IMember | IGuest;

export type UserType = "member" | "guest";

export type IOption = ContactType & {};
