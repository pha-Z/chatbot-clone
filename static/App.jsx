const App = () => {
    const [messageHistory, setMessageHistory] = React.useState([
        { 'role': 'user', 'content': 'this is a test. confirm?' },
        { 'role': 'assistant', 'content': 'As an AI language model bla bla bla... yes. confirm.' },
    ])

    async function handleSubmit(event) {
        event.preventDefault()
        const message = { role: 'user', content: event.target.elements.message.value }
        const newMessageHistory = [...messageHistory, message]
        // append user message to message history
        setMessageHistory(newMessageHistory)
        // clear input field
        event.target.reset()
        // fetch response
        const response = await fetch('/openai-api-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessageHistory),
        })
        const responseData = await response.json()
        // then also append to message history
        setMessageHistory([...newMessageHistory, responseData])
    }

    return (
        <div style={{ display: 'flex', width: 'calc(50% + 100px)', margin: 'auto' }}>
            < MessageHistory messageHistory={messageHistory} />
            < SubmitMessage handleSubmit={handleSubmit} />
        </div>
    )
}

const MessageHistory = ({ messageHistory }) => {
    return (
        <ul style={{ overflowY: 'auto', paddingLeft: 0, paddingBottom: 'calc(2 * 40px + 32px - 25px)', fontFamily: 'sans-serif', fontSize: 14 }}>
            {messageHistory.map((message, index) => (
                <li key={index} style={{ display: 'flex', flexDirection: 'column', margin: '25px 0' }}> {/* alignItems: message.role === 'user' ? 'flex-start' : 'flex-end', */}
                    <span style={{ fontWeight: 'bold', color: message.role === 'user' ? '#ff00ff' : '#90ee90' }}>{message.role}</span>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
                </li>
            ))}
        </ul>
    )
}

const SubmitMessage = ({ handleSubmit }) => {
    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', width: 'calc(50% + 150px)', margin: '40px 0', position: 'fixed', bottom: 0, left: 'calc(25% - 75px)' }}
        >
            <input
                type="text"
                placeholder="Send a message..."
                name="message"
                style={{ flexGrow: 1, padding: '8px', borderRadius: '8px', borderStyle: 'none', backgroundColor: "#3b3b3b", color: "#ffffff" }}
            />
            <button
                type="submit"
                style={{ marginLeft: '5px', padding: '8px', borderRadius: '8px', borderStyle: 'none', backgroundColor: "#6b6b6b", color: "#ffffff" }}
            >
                &gt;&gt;
            </button>
        </form>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);