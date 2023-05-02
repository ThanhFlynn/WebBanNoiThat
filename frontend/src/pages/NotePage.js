import React, {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left-solid.svg';

const NotePage = () => {

    let { nodeId }= useParams();

    let [note, setNote] = useState([])

    useEffect(() => {
        getNote();
    },[])

    let getNote = async () =>{
        if (nodeId === 'new') return;

        let response = await fetch(`/api/notes/${nodeId}`);
        let data = await response.json();
        setNote(data);
    }

    let createNote = async () =>{
        fetch(`/api/notes/create/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
        })
    }

    let updateNote = async () =>{
        fetch(`/api/notes/update/${nodeId}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
        })
    }

    let deleteNote = async ()=>{
        fetch(`/api/notes/delete/${nodeId}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }

    let handleSubmit = ()=>{
        if(nodeId !=='new' && !note.body){
            deleteNote();
        }else if(nodeId !=='new'){
            updateNote();
        }else if(nodeId ==='new' && note.body !== null){
            createNote()
        }
    }
    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {nodeId !== 'new' ? (
                    <Link to="/">
                        <button onClick={deleteNote}>DELETE</button>
                    </Link>
                ) : (
                    <Link to="/">
                        <button onClick={handleSubmit}>Done</button>
                    </Link>
                )}
                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage
