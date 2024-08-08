import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import NavBar from '../../app/components/NavBar/NavBar';
import LoginModal from '../../app/components/Modals/LoginModal';
import SignupModal from '../../app/components/Modals/SignupModal';

type Data = {
    _id: number;
    name: string;
    username: string;
    email: string;
};

const Users = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
    fetch('/api/getUsers')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
    <div>
        {/* <NavBar
            onLoginOpen={() => setIsLoginOpen(true)}
            onSignupOpen={() => setIsSignupOpen(true)}
        /> */}

        <div className="auth-buttons">
            <button onClick={() => setIsLoginOpen(true)}>Login</button>
            <button onClick={() => setIsSignupOpen(true)}>Sign Up</button>
        </div>

        <h1>Users collection from db</h1>
        <ul>
        { data.length === 0 ?
            <h2>No users yet!</h2>
            :
            data.map((user, userId) => (
                <h3 key={userId}>
                    <div>Username: {user.username}</div>
                    {/* <div>Name: {user.name}</div> */}
                    <div>Email: {user.email}</div>
                </h3>
            ))
        }
        </ul>
        
        <LoginModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)} />
        <SignupModal isOpen={isSignupOpen} onRequestClose={() => setIsSignupOpen(false)} />
    </div>
    );
};

export default Users;
