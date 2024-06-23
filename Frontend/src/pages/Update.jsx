<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert
} from "@mui/material";

const Update = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setUser(response.data);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;

        const updatedUser = { name, email, photoURL };

        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/users/update_user/${id}`, updatedUser, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                console.log("User updated successfully:", response.data);
            } else {
                throw new Error(response.data.message || "Failed to update user");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            console.error("Error updating user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Update User Here
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleUpdateUser}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    defaultValue={user?.name}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    defaultValue={user?.email}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Photo URL"
                    name="photoURL"
                    defaultValue={user?.photoURL}
                    placeholder="Upload new profile picture"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    style={{ marginTop: '20px' }}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
            </form>
        </Container>
    );
};

export default Update;
=======
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert
} from "@mui/material";

const Update = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loadedUser = useLoaderData();

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;

        const updatedUser = { name, email, photoURL };

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/users/${loadedUser._id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            });
            const data = await response.json();

            if (response.ok) {
                console.log("User updated successfully:", data);
            } else {
                throw new Error(data.message || "Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Update User Here
            </Typography>
            <form onSubmit={handleUpdateUser}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    defaultValue={loadedUser?.name}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    defaultValue={loadedUser?.email}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Photo URL"
                    name="photoURL"
                    placeholder="Upload new profile picture"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    style={{ marginTop: '20px' }}
                >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                </Button>
            </form>
        </Container>
    );
};

export default Update;
>>>>>>> c84e2d8fdc3d275c5d15537a4d6cb24c481a1cbb
