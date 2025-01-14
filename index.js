const handleClickEncode = async () => {
  const message = document.getElementById('input').value
  const hash = await sha256(message)
  document.getElementById('output').innerText = hash
}

const sha256 = async (message) => {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
  return hashHex
}

const copiedTimer = {
  timer: null,
}

const handleClickCopy = () => {
  const hash = document.getElementById('output')?.innerText ?? ''
  navigator.clipboard.writeText(hash)
  const button = document.getElementById('copy')
  button.classList.add('copied')
  copiedTimer.timer && window.clearTimeout(copiedTimer.timer)
  copiedTimer.timer = window.setTimeout(() => {
    button.classList.remove('copied')
  }, 2000)
}

const handleClickClear = async () => {
  document.getElementById('input').value = ''
  document.getElementById('output').innerText = ''
}

const handlers = {
  encode: handleClickEncode,
  copy: handleClickCopy,
  clear: handleClickClear,
}

for (const [key, handler] of Object.entries(handlers)) {
  document.getElementById(key).addEventListener('click', handler)
}

const handleKeydownInput = (event) => {
  if (event.key === 'Enter') {
    handleClickEncode()
  }
}
document.getElementById('input').addEventListener('keydown', handleKeydownInput)
