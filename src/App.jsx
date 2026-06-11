import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [userToShow, setUserToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setUserToShow(user.slice(startIndex, endIndex));
  }, [currentPage, user]);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(user.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      return prev + 1;
    });
  };

  return !userToShow.length ? (
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
          {userToShow?.map((item) => (
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
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          Prev
        </button>
        <span> page {currentPage} </span>
        <span> of </span>
        <span>{totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default App;
