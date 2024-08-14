let socket = io("http://localhost:9000")

let chatWrapper = document.querySelector(".chat-wrapper")
let messageForm = document.querySelector(".message-form")
let messageInput = document.querySelector(".message-input")
let typing = document.querySelector(".typing")

let name = prompt("Ismingizni kiriting")
let h3 = document.createElement("h3")
h3.textContent = `Xush kelibsiz ${name}`
chatWrapper.append(h3)

messageForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let text = messageInput.value
    messageInput.value = ""

    let p = document.createElement("p")
    p.textContent = `You :  ${text}`
    chatWrapper.append(p)

    socket.emit("send-message", {name, text})
})

messageInput.addEventListener("input", (e) => {
    socket.emit("typing", name)
})

socket.emit("new-user", name)

socket.on("new-user-joined", (name) => {
    let h3 = document.createElement("h3")
    h3.textContent = `${name} joined`
    chatWrapper.append(h3)
})

socket.on("send-user-message", ({name, text}) => {
    let p = document.createElement("p")
    p.textContent = `${name} :  ${text}`
    chatWrapper.append(p)
})

socket.on("user-typing", (name) => {
    typing.textContent = `${name} yozmoqda.....`
    setTimeout(() => {
      typing.textContent = "" 
    }, 1000)
})