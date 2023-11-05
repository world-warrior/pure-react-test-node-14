import React, { useEffect, useState } from "react";
import axios from "axios";
import "./users.css";
import Album from "./Album";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [filter, setFilter] = useState("");
  const [userData, setUserData] = useState([]);

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

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  if (order !== null) {
    filteredUsers.sort((a, b) => {
      const usernameA = a.username.toLowerCase();
      const usernameB = b.username.toLowerCase();

      if (usernameA < usernameB) {
        return order === true ? -1 : 1;
      }
      if (usernameA > usernameB) {
        return order === true ? 1 : -1;
      }

      return 0;
    });
  }

  const fetchUserAlbum = (userId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchUserPost = (userId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <div>
      <input
        type="text"
        className="user-filter"
        placeholder="Input type string to filter table by user name"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th onClick={() => setOrder(!order)}><a href="#">User Name</a></th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Album</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, _i) => {
            return (
              <tr key={_i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.phone}</td>
                <td>
                  <a href="#" onClick={() => fetchUserAlbum(user.id)}>Show Albums</a>
                </td>
                <td>
                  <a href="#" onClick={() => fetchUserPost(user.id)}>Show Posts</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr />

      <ul>
        {userData.map((data, _i) => {
          return (
            <li key={_i}>
              {data.id}-
              {data.title}
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Users;
