import './App.css';
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
  props.topics.map(x => lis.push(<li key={x.id}>
    <a id={x.id} href={'/read/' + x.id} onClick={event => {event.preventDefault(); props.onChangeMode(event.target.id);}}>{x.title}</a>
    </li>))
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
  const topics = [
    {id:1, title:'html' , body:'html is ...'},
    {id:2, title:'css' , body:'css is ...'},
    {id:3, title:'js' , body:'js is ...'},
  ]
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() =>{alert('header')}}></Header> 
      <Nav topics ={topics} onChangeMode={(id)=>{alert(id)}}></Nav>
      <Article title='Welecome' body='Hello!!!'></Article>
    </div>
  );
}

export default App;