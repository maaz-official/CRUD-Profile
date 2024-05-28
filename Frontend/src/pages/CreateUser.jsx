import { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';

const CreateUser = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddUser = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;

        const user = { name, email, photoURL };

        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("User added successfully!");
                form.reset();
            } else {
                setErrorMessage(data.message || "Failed to add user");
            }
        } catch (error) {
            setErrorMessage("Failed to add user");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '160px' }}>
            <Typography variant="h4" gutterBottom>
                Create A User Here
            </Typography>
            {isLoading && <CircularProgress />}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <form onSubmit={handleAddUser}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Your name"
                    name="name"
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter your email here.."
                    name="email"
                    type="email"
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Enter your photo URL here.."
                    name="photoURL"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    style={{ marginTop: '20px' }}
                >
                    {isLoading ? 'Adding User...' : 'Add User'}
                </Button>
            </form>
        </Container>
    );
};

export default CreateUser;
