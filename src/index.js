const dataUrl = 'http://localhost:3000/quotes?_embed=likes'
const data = "http://localhost:3000/quotes"
const quoteList = document.getElementById('quote-list')

function renderData() {
    fetch(dataUrl).then(res=>res.json()).then(data=> {
        console.log(data)
        //const quoteList = document.getElementById('quote-list')
        console.log(quoteList)
        data.forEach((quote) => {
            quoteList.append(createQuote(quote))
        })
    })
}

function createQuote(quote) {
    const li = document.createElement('li')
    li.id = quote.id
    const blockquote = document.createElement('blockquote')
    li.className='quote-card'
    const p = document.createElement('p')
    p.textContent = quote.quote
    p.className = "mb-0"
    const footer = document.createElement('footer')
    footer.className = "blockquote-footer"
    footer.textContent = quote.author
    const lineBreak = document.createElement('br')
    const likeBtn = document.createElement('button')
    likeBtn.className = 'btn-success'
    likeBtn.textContent = "Likes: "
    const span = document.createElement('span')
    span.textContent = 0
    likeBtn.append(span)
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.textContent = "DELETE"
    deleteBtn.addEventListener('click', (e) => {
        console.log(e)
        fetch(`${data}/${quote.id}`, {
            method: "DELETE"
        }).then(res=> res.json()).then(data => {
            console.log(data)
            //document.querySelector(`li#${quote.id}`).remove()
        })
    })

    li.append(blockquote, p, footer, lineBreak, likeBtn, deleteBtn)
    return li
}

function handleForm() {
    const form = document.querySelector('#new-quote-form')
    form.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(e)
    const newQuote = e.target[0].value
    const newQuoteAuthor = e.target[1].value
    console.log(newQuote)
    console.log(newQuoteAuthor)
    const newQuoteObj = {
        quote: newQuote,
        author: newQuoteAuthor
    }
    fetch(data, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newQuoteObj)
    }).then(res => res.json()).then(data=> {
        console.log(data)
        quoteList.append(createQuote(newQuoteObj))
    })
    })
}


  function DOMLoaded() {
      document.addEventListener("DOMContentLoaded", ()=>{
        console.log("DOM Loaded")
        renderData()
        handleForm()
      })
    }

    DOMLoaded()
