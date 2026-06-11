import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    fetch("https://dummyjson.com/users?limit=500")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.users);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !user.length ? (
    <> No users to show </>
  ) : (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
