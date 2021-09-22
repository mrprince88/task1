import { FormControl,InputLabel,Input,Grid,Button,Paper,Container} from "@material-ui/core"
import {useState} from 'react'
import axios from 'axios'

export default function Form({user,data,setData,setForm}) {

    const [name,setName]=useState(user?.name)
    const [username,setUsername]=useState(user?.username)
    const [email,setEmail]=useState(user?.email)
    const [phone,setPhone]=useState(user?.phone)
    const [website,setWebsite]=useState(user?.website)
    const idx=user?.id

    const saveUser = async()=>{
        if(user!==null) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${idx}`,{
            id:idx,
            name:name,
            username:username,
            email:email,
            phone:phone,
            website:website
        }).then(response=>setData(data.filter(d=>d.id!==idx).concat(response.data).sort((a,b)=>a.id-b.id)))
    }
        else {
            await axios.post('https://jsonplaceholder.typicode.com/users',{
                name:name,
                username:username,
                email:email,
                phone:phone,
                website:website
            }).then(response=>setData(data.concat(response.data)))
        }
        setForm(false)
    }

    const deleteUser = async()=>{
        if(idx!==null) {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${idx}`).then(()=>{
                setData(data.filter(d=>d.id!==idx))
            })
        }
        setForm(false)
    }

    return (
        <Paper elevation={3} style={{padding:'20px'}}>
            <Container>
            <Grid container>
                <Grid item xs={6}>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input defaultValue={name} onChange={e=>setName(e.target.value)}/>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl>
                    <InputLabel>Username</InputLabel>
                    <Input defaultValue={username} onChange={e=>setUsername(e.target.value)}/>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input defaultValue={email} onChange={e=>setEmail(e.target.value)}/>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl>
                    <InputLabel>Phone</InputLabel>
                    <Input defaultValue={phone} onChange={e=>setPhone(e.target.value)}/>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl>
                    <InputLabel>Website</InputLabel>
                    <Input defaultValue={website} onChange={e=>setWebsite(e.target.value)}/>
                </FormControl>
                </Grid>
                <Grid item xs={6} style={{paddingTop:'20px'}}>
                    <Button variant='contained' style={{marginRight:'10px'}} onClick={saveUser}>Save</Button>
                    <Button variant='contained' onClick={deleteUser}>Delete</Button>
                </Grid>
            </Grid>
            </Container>
        </Paper>
    )
}
