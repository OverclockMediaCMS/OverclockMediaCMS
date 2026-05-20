export interface User {
    id : number;
    Email : string;
    FirstName : string;
    LastName : string;
}
export interface Post {
    id : number;
    Title : string;
    Body : string;
    isDraft : boolean;
    User : User;
}