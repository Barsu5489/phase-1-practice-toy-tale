let addToy = false;


function toys(){
  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toy=>{
    console.log(toy)
    renderToys(toy)
  })
}

function renderToys(toys){
  toys.forEach(toy=>{
    const toyCollection = document.getElementById('toy-collection')
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    const h2 = document.createElement('h2')
    h2.textContent = toy.name
    const image = document.createElement('img')
    image.classList.add('toy-avatar')
    image.src = toy.image

    const p =  document.createElement('p')
    p.textContent = toy.likes

    const btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.textContent = 'Like ❤️'
    btn.id = `[${toy.id}]`

    toyCollection.appendChild(cardDiv)
    cardDiv.appendChild(h2)
    cardDiv.appendChild(image)
    cardDiv.appendChild(p)
    cardDiv.appendChild(btn)
    function patchLikes(){
    
      btn.addEventListener('click', ()=>{
        console.log('clicked')

  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes": toy.likes ++
    })

  })
  .then(res=>res.json())
  .then(like=>{
    console.log(like)
  })
       
      })
    }
    patchLikes()

  })
  postToy()
}






function postToy(){
const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit',e=>{
  e.preventDefault()
  const name = e.target.name.value
  const  image = e.target.image.value

  const data = {
    name:name,
    image:image,
    likes:0
  }
  fetch('http://localhost:3000/toys',{
    method:'POST',
    headers:
    {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    body:JSON.stringify(data)
  })
  .then(res=>res.json())
  .then(to=>{
    console.log(to)
  })
})
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    
    toys()
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
