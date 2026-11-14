
import { useState, useEffect, useMemo } from "react";
import { debounce } from "./utils";

function App() {

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchUsers = useMemo(() => {
        return debounce((value) => {
            setDebouncedSearch(value);
        }, 400);
    }, []);

    useEffect(() => {
    searchUsers(search);
    return () => {
        searchUsers.cancel();
    };
}, [search, searchUsers]);

    
useEffect(() => {
    if (debouncedSearch === "") {
        setUsers([]);
        setLoading(false);
        return;
    }
    const controller = new AbortController();
    async function getUsers() {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(
                `https://dummyjson.com/users/search?q=${debouncedSearch}`,
                {
                    signal: controller.signal
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setUsers(data.users);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError("Something went wrong");
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }
    getUsers();
    return () => {
        controller.abort();
    };
}, [debouncedSearch]);
    return (
        <div>
            <h1>User Search</h1>

            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search.trim() === "" && <p>Type to search</p>}
            <p>You are searching for: {search}</p>
            

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {users.map((user) => (
                <div key={user.id}>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <p>{user.email}</p>
                    <p>{user.address.city}</p>
                </div>
            ))}
        </div>
    );
}
export default App;
