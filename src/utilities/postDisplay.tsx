import { useEffect, useState, type FC } from "react";
import type { Post } from "../models";
import { getFromEndpoint } from "./helpers";
import "../style/post.css"
//generic element for displaying post, takes post model as interface

export const PostLimitedDisplay: FC<Post> = ({ Title, Body, User, Tags }) => {
  return (
    <div className='postLimited'>
      <h1>{Title}</h1>
      <h2>Written by {User.FirstName}</h2>
      <ul> {Tags.map((tag) => (
        <p key={tag.id}> Tags: {tag.Title}</p>
      ))}</ul>
    </div >
  )
}
export const PostDetailedDisplay: FC<Post> = ({ Title, Body, User, Tags }) => {
  return (
    <div className='postDetalied'>
      <h1>{Title}</h1>
      <h2>Written by {User.FirstName}</h2>
      <ul> {Tags.map((tag) => (
        <p key={tag.id}> Tags: {tag.Title}</p>
      ))}</ul>
      <p>{Body}</p>
    </div >
  )
}
