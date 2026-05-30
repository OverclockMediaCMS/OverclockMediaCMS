export interface Tag {
  id: number;
  Title: string;
}
export interface User {
  id: number;
  Email: string;
  FirstName: string;
  LastName: string;
}
export interface Post {
  id: number;
  Title: string;
  Body: string;
  isDraft: boolean;
  Date: string;
  User: User;
  Tags: Tag[];
}
export interface Media {
  id: number;
  Title: string;
  FileExtension: string;
  FilePath: string;
  Date: string;
  User : User;
}
