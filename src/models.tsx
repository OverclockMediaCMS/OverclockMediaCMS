export interface Tag {
  id: number;
  Title: string;
}

export interface LoginUser {
  Email: string;
  Password: string;
}

export interface CreateUser {
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
}

export interface User {
  id: number;
  Email: string;
  FirstName: string;
  LastName: string;
  MobilePhone: number;
  InternalPhone: number;
  postCount: number;
  mediaCount: number;
}
export interface Post {
  id: number;
  Title: string;
  Body: string;
  isDraft: boolean;
  Date: string;
  User: User;
  Tags: Tag[];
  Comments: Comment[];
  Media: Media[];
}
export interface Media {
  id: number;
  Title: string;
  FileExtension: string;
  FilePath: string;
  Date: string;
  User: User;
}
export interface Comment {
  id: number;
  Description: string;
  User: User;
  Date: Date;
}
export interface CreateComment {
  Description: string;
  UserId: number;
  PostId: number;
}
export interface Theme {
  Darkmode: boolean;
}
export interface TOCItem {
  name: string;
  type: number;
}
export interface CreatePost {
  Title: string;
  Body: string;
  isDraft: boolean;
  UserId: number;
}