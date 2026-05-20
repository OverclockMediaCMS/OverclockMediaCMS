import { useEffect, useState } from "react";
import {getFromEndpoint} from "../utilities/helpers"
import type {User} from "../models.tsx"

export function Dashboard(){
  const [users, setUsers] = useState<Array<User>>([]);
  useEffect (() => {
    const fetchData = async () => {
      let u = await getFromEndpoint("users");
      let usersList : Array<User> = u;
      setUsers(usersList);
    }
    fetchData();
  }, []);
  return(
    <div>
      <h1>Dashboard</h1>
      <p>{users[0]?.Email}</p>
    </div>
  )
}

