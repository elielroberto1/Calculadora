const main = document.querySelector('main') //Peguei a Tag Main do HTML, so existe uma tag main no html então não tem problema usar o QuerySelector
const root = document.querySelector(':root') //Peguei a tag :root do CSS
const input = document.getElementById('input') //Peguei o ID da tag input do HTML
const resultInput = document.getElementById('result') //Peguei o id do resultado do input do HTML

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] //teclas permitidas na calculadora


document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
charKeyBtn.addEventListener('click', function() {
  const value = charKeyBtn.dataset.value
  input.value += value
})
})//Funcionamento dos botões da calculadora, selecioanando todos por classe e iterando sobre os mesmos

document.getElementById('clear').addEventListener('click',function() {
  input.value = ''
  input.focus()
})

input.addEventListener('keydown',function(ev) {
  ev.preventDefault()
  if(allowedKeys.includes(ev.key)) {
    input.value+=ev.key
    return
  }//evento quando o usuario aperta qualquer tecla no teclado. Nesse caso estou impedindo esse compartamento padrão. E permitindo apenas as teclas que estão no array acima
  if (ev.key ==='Backspace') {
    input.value = input.value.slice(0,-1)
  }
  if(ev.key==='Enter') {
    calculate()
  }
})

document.getElementById('equal').addEventListener('click',calculate)

function calculate () {
  resultInput.value='ERROR'
  resultInput.classList.add('error')
  const result = eval(input.value)
  resultInput.value=result
  resultInput.classList.remove('error')
}//funcionamento do botao de =, utilizando eval o que não é adequado

document.getElementById('copyToClipboard').addEventListener('click', function(ev){
  const button =ev.currentTarget
  if(button.innerText === 'Copy') {
    button.innerText = 'Copied!'
    button.classList.add('success')
    navigator.clipboard.writeText(resultInput.value)
  }else {
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})
document.getElementById('themeSwitcher').addEventListener('click', function() {
  if(main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color','#f1f5f9')
    root.style.setProperty('--border-color','#aaa')
    root.style.setProperty('--font-color','#212529')
    root.style.setProperty('--primary-color','#26834a')
    main.dataset.theme='light'
  }else {
    root.style.setProperty('--bg-color','#212529')
    root.style.setProperty('--border-color','#666')
    root.style.setProperty('--font-color','#f1f5f9')
    root.style.setProperty('--primary-color','#4dff91')
    main.dataset.theme='dark'
  }
})
