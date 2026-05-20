import { useEffect, useState, type FC } from "react";
import type { Post } from "../models";
import { getFromEndpoint } from "./helpers";
import "../style/post.css"
//generic element for displaying post, takes post model as interface
export const PostDisplay :FC<Post> = ({Title, Body, User}) => {
    return(
        <div className='container'>
            <h1>{Title}</h1>
            <h2>Written by {User.FirstName}</h2>
            <p>{Body}</p>
        </div>
    )
}