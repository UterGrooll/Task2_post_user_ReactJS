import React, { useEffect, useState } from 'react';

function App() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const filteredPosts = posts.filter(post => post.userId === selectedUserId);

    return (
        <div className="container">
            <div className="users">
                <h2>Пользователи</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="posts">
                {selectedUserId && (
                    <>
                        <h2>Посты пользователя: {users.find(u => u.id === selectedUserId)?.name}</h2>
                        {filteredPosts.map(post => (
                            <div key={post.id} className="post-card">
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;