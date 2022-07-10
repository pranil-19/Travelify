import { Dialog, MenuItem, Grid, DialogTitle, DialogContent, FormControl, InputLabel, Select, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import Input from '../Utiles/Input';
import { editTravel } from '../../api/travel';

const EditTravel = ({ id, isOpen, setIsOpen }) => {

    const classes = useStyles();
    const [data, setData] = useState(null);

    const handleSubmit = () => {
        setData(data);
        editTravel(id, data).then((res) => {
            console.log(res);
            setIsOpen(false);
            window.location.reload(false)
        })
            .catch((e) => console.log(e));
    }

    return (
        <Dialog open={isOpen} onClose={!isOpen} >
            <DialogTitle className={classes.dialog} >Edit Travel</DialogTitle>
            <DialogContent >
                <Grid container >
                    <Input margin="normal" name="Title" label="Title" handleChange={(e) => setData({ ...data, title: e.target.value })} autoFocus />
                    <Input margin="normal" name="Source" label="Source" handleChange={(e) => setData({ ...data, source: e.target.value })} autoFocus half />
                    <Input margin="normal" name="destination" label="Destination" handleChange={(e) => setData({ ...data, destination: e.target.value })} autoFocus half />
                    <Input margin="normal" name="detail" label="Details" handleChange={(e) => setData({ ...data, content: e.target.value })} autoFocus />
                    <Input margin="normal" name="ExpensePerHead" label="ExpensePerHead" handleChange={(e) => setData({ ...data, ExpensePerHead: e.target.value })} autoFocus half />
                    <Input margin="normal" name="AvailableSeats" label="AvailableSeats" handleChange={(e) => setData({ ...data, AvailableSeats: e.target.value })} autoFocus half />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleSubmit} >Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditTravel;