import React, { useEffect, useState } from "react";
import axios from "axios";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading === true) {
    return (
      <div>
        <h1>Loading User datas...</h1>
      </div>
    );
  }

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserName</th>
            <th onClick={() => console.log('name table clicked')}>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, _i) => {
            return (
              <tr key={_i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
