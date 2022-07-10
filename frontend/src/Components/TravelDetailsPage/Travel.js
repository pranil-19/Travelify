import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import image from '../../images/profile1.jpg';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import image1 from '../../images/rightarrow.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import CommentCard from '../CommentCard/Comment';
import Input from '../Utiles/Input';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getTravel, deleteTravel, addcomment, addlike } from '../../api/travel';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import EditTravel from '../EditTravelModel/EditTravel';
import { CardActionArea, CardMedia } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { getuser } from '../../api/auth';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Travel = (props) => {
    const navigator = useNavigate();
    const theme = useTheme()
    const params = useParams();
    const { id } = params;
    const [data, setData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user')).user;
    const [open, setOpen] = useState(false);
    const [CreatorData, setCreatorData] = useState(null);

    useEffect(() => {

        getTravel(id)
            .then((res) => {
                setData(res.data)
                getuser(res.data.owner)
                    .then((res) => {
                        setCreatorData(res.data);
                    })
                    .catch((Err) => {
                        console.log(Err);
                    })
            })
            .catch((e) => console.log(e));
    }, [])

    const handleDelete = () => {
        deleteTravel(data._id).then((res) => {
            console.log(res);
            navigator('/dashboard');
        })
            .catch((e) => console.log(e))
    }

    const [description, setDescription] = useState('');
    const addComment = () => {
        console.log(description)
        addcomment(data._id, description)
            .then(() => {
                window.location.reload()
            })
            .catch((e) => console.log(e))
    }

    const handleditravel = () => {
        setOpen(true);
    }

    const handlelike = () => {
        addlike(data._id)
            .then(() => {
                window.location.reload()
            })
            .catch((e) => console.log(e))
    }

    const handlechange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            {open && <EditTravel isOpen={open} setIsOpen={setOpen} id={data._id} />}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader theme={theme} />
                {data === null || CreatorData === null ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: 300 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        style={{ width: '100%' }}
                                        image={image}
                                        alt="green iguana"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {CreatorData.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <div >
                                                <EmailIcon style={{ display: "inline" }} fontSize="small" />
                                                <Typography style={{ display: "inline", marginLeft: '10px' }} >{CreatorData.email}</Typography>
                                            </div>
                                        </Typography>
                                        <Typography style={{ marginTop: '15px', marginBottom: '10px' }} variant="body2" color="text.secondary">
                                            <div >
                                                <PhoneIcon style={{ display: "inline" }} fontSize="small" />
                                                <Typography style={{ display: "inline", marginLeft: '10px' }} >{CreatorData.contact}</Typography>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={5}>
                            <Card sx={{ maxWidth: '100%' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {CreatorData.name[0].toUpperCase()}
                                        </Avatar>
                                    }
                                    action={
                                        user._id === data.owner && (
                                            < div >
                                                <IconButton onClick={handleditravel} style={{ marginRight: '10px' }} aria-label="settings">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={handleDelete} >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        )
                                    }
                                    title={data.title}
                                    subheader={data.createdAt !== undefined ? data.createdAt.slice(0, 10) : data.date.slice(0, 10)}
                                />
                                <CardContent style={{ paddingTop: '0px' }} >
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', maxWidth: '400px' }} >
                                        <Typography variant="h6" >{data.source}</Typography>
                                        <img src={image1} width="100px" height="50px" />
                                        <Typography variant="h6" >{data.destination}</Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        {data.content}
                                    </Typography>
                                    <div style={{ marginTop: '10px' }} >
                                        <Typography style={{ display: 'inline' }} variant="subtitle1">Expense Per Head:- </Typography>
                                        <Typography variant="body2" style={{ display: 'inline' }}>{data.ExpensePerHead}</Typography>
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <Typography style={{ display: 'inline' }} variant="subtitle1">Available Seats:- </Typography>
                                        <Typography variant="body2" style={{ display: 'inline' }}>{data.AvailableSeats}</Typography>
                                    </div>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton onClick={handlelike} style={{ marginRight: '10px' }} aria-label="add to favorites">
                                        <FavoriteIcon />
                                        <Typography>{data.Likes.length}</Typography>

                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <CommentIcon />
                                        <Typography>{data.comments.length}</Typography>

                                    </IconButton>
                                </CardActions>
                            </Card>
                            <br />
                            <Card sx={{ maxWidth: '100%' }}>
                                <CardHeader
                                    title="Write a comment..."
                                />
                                <CardContent style={{ paddingTop: '0px', marginTop: '-10px' }} >
                                    <form>
                                        <Input margin="normal" name="comment" label="Comment" autoFocus handleChange={handlechange} />
                                    </form>
                                </CardContent>
                                <CardActions style={{ marginTop: '-15px' }} disabeSpacing>
                                    <IconButton onClick={addComment} style={{ marginRight: '10px' }} aria-label="add to favorites">
                                        <SendIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} style={{ maxHeight: '90vh', overflow: 'auto' }} >
                            {data.comments.map((c) => {
                                return (
                                    <div>
                                        <CommentCard blogid={data._id} comment={c} />
                                        <br />
                                    </div>
                                )
                            })}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box >
    )
}

export default Travel;