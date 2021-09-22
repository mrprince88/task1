import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Popover} from '@material-ui/core';
import axios from 'axios'
import { useEffect,useState } from 'react';
import Form from './components/Form'

export default function App() {

  const [data,setData] = useState(null);
  const [form,setForm] = useState(false);
  const [selected,setSelected]=useState(null);

  useEffect(()=>{
    const fetchData=async()=>await axios.get('https://jsonplaceholder.typicode.com/users').then(response=>setData(response.data))
    fetchData()
  },[])

  const handleClick=(index)=> {
    setForm(true)
    setSelected(index===null ? null : data[index])
  }

  const handleClose=()=>{
    setForm(false)
    setSelected(null)
  }

  return (
    <Container>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Username</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Phone</TableCell>
          <TableCell align="right">Website</TableCell>
          <TableCell align="right"><Button variant='contained' onClick={()=>handleClick(null)}>New</Button></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((d,index) => (
          <TableRow
            key={d.id}
          >
            <TableCell component="th" scope="row">
              {d.name}
            </TableCell>
            <TableCell align="right">{d.username}</TableCell>
            <TableCell align="right">{d.email}</TableCell>
            <TableCell align="right">{d.phone}</TableCell>
            <TableCell align="right">{d.website}</TableCell>
            <TableCell align="right">
                <Button onClick={()=>handleClick(index)}>
                  Edit
                </Button>
              </TableCell>
              </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Popover 
  open={form}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
  >
    <Form user={selected} data={data} setData={setData} setForm={setForm}/>
  </Popover>
  </Container>
  )
}



