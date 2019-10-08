console.log('this is static javascript file')

fetch('http://localhost:3000/weather?address=patna').then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            console.log(data.error)
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const paragraph=document.querySelectorAll('p')

document.addEventListener('submit',(e)=>{
    paragraph[1].textContent='Loading...'
    e.preventDefault()
    const searchval=search.value
        fetch('/weather?address='+searchval).then((response)=>{//fetch('http://localhost:3000/weather?address='+searchval).then((response)=>
            response.json().then((data)=>{
                if(data.error){
                    paragraph[1].textContent=''
                    paragraph[2].textContent=data.error//console.log(data.error)
                }
                else{
                    // console.log(data.location)
                    // console.log(data.forecast)
                    paragraph[1].textContent=data.location
                    paragraph[2].textContent=data.forecast
                }
            })
        })
})