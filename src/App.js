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
function App() {
//   const _mode = useState('WELCOME');
//   const mode = _mode[0]; // state의 초깃값은 state의 0번째 값
//   const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME'); // 위 3줄과 같은 의미 but 가장 자주 사용하는 문법
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html' , body:'html is ...'},
    {id:2, title:'css' , body:'css is ...'},
    {id:3, title:'js' , body:'js is ...'},
  ]

  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title='Welecome' body='Hello, WEB'></Article>;
  } else if(mode === 'READ') {
    let title, body = null;
    topics.forEach((topic) => {
      if (topic.id === id){
        title = topic.title;
        body = topic.body;
        content = <Article title={title} body={body}></Article>;
      }
    })
  }

  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() =>{setMode('WELCOME')}}></Header> 
      <Nav topics ={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
        }}></Nav>
      {content}
    </div>
  );
}

export default App;