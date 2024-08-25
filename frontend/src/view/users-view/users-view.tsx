import { useEffect, useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username?: string;
  email?: string;
  fullName?: string;
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  min-height: 100vh;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #dddddd;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #6e8efb;
    outline: none;
    box-shadow: 0 0 5px rgba(110, 142, 251, 0.5);
  }
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
  margin: 0;
`;

const UserItem = styled.li`
  background-color: #ffffff;
  color: #333333;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Loading = styled.div`
  color: #ffffff;
  font-size: 18px;
`;

const ErrorStyle = styled.div`
  color: #ff0000;
  font-size: 18px;
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 10%;
  top: 8%;
  background-color: #ff4b4b;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e03b3b;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

export const UsersView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("jwtToken");
      if (!token) navigate("/");
      try {
        const response = await fetch("http://localhost:8000/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        const ResponseData = await response.json();
        setUsers(ResponseData.data);
        setFilteredUsers(ResponseData.data);
      } catch (err) {
        const error = err as Error;
        setError(
          error.message || "An unknown error occurred. Please try again later."
        );
        console.error("An error occurred:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
  };

  if (loading) {
    return (
      <Container>
        <Loading>Loading...</Loading>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorStyle>Error: {error}</ErrorStyle>
      </Container>
    );
  }

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Title>User List</Title>
      <SearchInput
        type="text"
        placeholder="Search by username..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredUsers.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <UserList>
          {filteredUsers.map((user, id) => (
            <UserItem key={id}>{user.username || "Unknown User"}</UserItem>
          ))}
        </UserList>
      )}
    </Container>
  );
};
