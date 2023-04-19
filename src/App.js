import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log(props)
  
  return <header>
          <h1><a href='/' onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}>{props.title}</a></h1>
        </header> 
}
function Nav(props) {
  const lis = []
  props.topics.map(x => lis.push(
  <li key={x.id}>
    <a id={x.id} href={'/read/' + x.id} onClick={
      event => {event.preventDefault(); 
      props.onChangeMode(Number(event.target.id));}
      }
    >
      {x.title}
    </a>
    </li>)
    )
  return <nav>
          <ol>
            {lis}
          </ol>
        </nav>
}
function Article(props) {
  return <article>
          <h2>{props.title}</h2>
          {props.body}
        </article>
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title'></input></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      console.log(title, body);
      props.onUpdate(title,body);
    }}>
      <p><input type='text' name='title' value={title} placeholder='title' onChange={event=>{
        console.log(event.target.value);
        setTitle(event.target.value);
      }}></input></p>
      <p><textarea name='body' value={body} placeholder='body' onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value='Update'></input></p>
    </form>
  </article>
}

function App() {
//   const _mode = useState('WELCOME');
//   const mode = _mode[0]; // state의 초깃값은 state의 0번째 값
//   const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME'); // 위 3줄과 같은 의미 but 가장 자주 사용하는 문법
  const [id, setId] = useState(null);
  const [nextId, setNextid] = useState(4);

  const [topics, setTopics] = useState([
    {id:1, title:'html' , body:'html is ...'},
    {id:2, title:'css' , body:'css is ...'},
    {id:3, title:'js' , body:'js is ...'},
  ]);

  let content = null;
  let contextControll = null; 

  if(mode === 'WELCOME') {
    content = <Article title='Welecome' body='Hello, WEB'></Article>;
  } else if(mode === 'READ') {
    let title, body = null;
    topics.forEach((topic) => {
      if (topic.id === id){
        title = topic.title;
        body = topic.body;
      }
    })
    content = <Article title={title} body={body}></Article>;
    contextControll = <li><a href={'/update/' + id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>;
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopics = [...topics];
      newTopics.push({id:nextId, title: _title, body: _body});
      setTopics(newTopics);
      setId(nextId);
      setNextid(nextId+1);
      setMode('READ')
    }}></Create>
  } else if (mode === 'UPDATE') { 
    let title, body = null;
    topics.forEach((topic) => {
      if (topic.id === id){
        title = topic.title;
        body = topic.body;
      }
    })
    content = <Update title={title} body={body} onUpdate={(_title, _body)=>{
      const newTopics = [...topics];
      const updatedTopic = {id:id, title:_title, body:_body};
      for(let i = 0 ; i < newTopics.length ; i++) {
        if (newTopics[i].id === id ){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() =>{setMode('WELCOME')}}></Header> 
      <Nav topics ={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
        }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControll}
      </ul>
      
    </div>  
  );
}

export default App;