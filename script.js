const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Cual es tu nombre aweonao')
appendMessage('Entraste a la sala')
socket.emit('new-user', name)
socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name =>{
    appendMessage(`${name} se ha unido a la sala`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`Tu: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
