import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/users");
                setUsers(response.data);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const removeUser = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${_id}`);
            setUsers(users.filter(user => user._id !== _id));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <Container style={{ marginTop: '30px' }}>
            <Link to="/create-user" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>
                    Create Profile
                </Button>
            </Link>
            <Typography variant="h4" gutterBottom>
                All available users: {users.length}
            </Typography>
            {isLoading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={3}>
                {users.map(user => (
                    <Grid item key={user._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={user.photoURL}
                                alt={user.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                                <Link to={`/update/${user._id}`} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                        Update
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: '10px', marginLeft: '10px' }}
                                    onClick={() => removeUser(user._id)}
                                >
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;
