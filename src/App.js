import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import _ from 'lodash'

//TODO:
// - responsiveness (mobile)
// - show who is present

const data = [
  {name: "test person", message: "hi"},
  {name: "Batman", message: "I'm Batman"},
  {name: "test person", message: "Save Gotham"},
  {name: "test person", message: "Save Gotham"},
  {name: "someone else", message: "Save Gotham"},
  {name: "test person", message: "Save Gotham"},
  {name: "test person", message: "Save Gotham"},
  {name: "test person", message: "Save Gotham"},
  {name: "test person", message: "Save Gotham"},
]

function App() {
  const [name, setName] = useState()
  const [saved, setSaved] = useState(false)
  const [storedMsgs, setStoredMsgs] = useState(data)
  console.log({storedMsgs})


  return (
    <div className="bg-gray-300 min-h-screen">
    <div className="bg-gray-100 container mx-auto py-4 px-2">
      <h1
        className="mx-auto text-center text-3xl"
      >
      Chat w Zette
      </h1>

      {!saved && <NameInput
        name={name}
        setName={setName}
        setSaved={setSaved}
      />}
      {saved && <>
        <h2
          className="text-center my-2 text-xl"
        >Welcome {name}</h2>
        <div
          className="md:flex-row flex-col flex justify-around"
        >
          <Messages messages={storedMsgs} />
          <Attendees messages={storedMsgs} />
        </div>
        <MessageInput onSend={
          newMessage => setStoredMsgs([...storedMsgs, newMessage])}
          name={name}
        />
      </>}
    </div>
    </div>
  );
}

const MessageInput = ({onSend, name}) => {
  const [newMessage, setNewMessage] = useState()
  const handleClick = () => {
    onSend({name: name, message: newMessage})
    setNewMessage('')
  }
  return (
    <div
      className="mt-4 pl-8"
    >
    <input placeholder="Message comes here..."
      value={newMessage}
      type="text"
      onChange={e => setNewMessage(e.target.value)}
          className="px-2 border-2 border-gray-900 rounded"
    />
      <button onClick={handleClick} type="button"
          className="px-2 border-2 border-gray-900 ml-2 bg-blue-700 text-white rounded"
      >Send</button>
      </div>
  )
}
const Attendees = ({messages}) => {
  const names = messages.map(msg => msg.name)
  const uniqueNames = _.uniq(names)
  return <div
    
    className="pl-2 bg-blue-100 w-1/3 py-2 rounded my-8 md:my-0"
  >
    <h3
      className="text-lg font-semibold"
    >Attendees</h3>
    {uniqueNames.map(name => <div
    >
      {name}
    </div>)}
  </div>
}
const Messages = ({messages}) => {

    const renderedMessages = messages.map((msg, i) => <Message message={msg} key={i} />)
  return (
    <div
      className="bg-white w-1/2 pl-2 max-h-32 overflow-y-auto"
    >
      {renderedMessages}
    </div>
  )
}

const Message = ({message}) => {
  return (
    <p>{message.name}: {message.message}</p>
  )
}

const NameInput = ({name, setName, setSaved}) => {
  return(
      <div
        className="mt-8"
      >
        <span
          className="mr-4"
        >Enter your name:</span>
        <br className="md:hidden" /> 
        <input name="name"
          type="text"
          onChange={e=> setName(e.target.value)}
          value={name}
          className="px-2 border-2 border-gray-900 rounded"
        />
        <button
          onClick={() =>setSaved(true)}
          type="button"
          className="px-2 border-2 border-gray-900 ml-2 bg-green-700 text-white rounded"
        >Save</button>
      </div>)
}

export default App;
