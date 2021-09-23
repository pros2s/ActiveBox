let fruits = [
  {id: 1, title: 'Apples', price: 20, img: 'images/fruits/apple.jpg'},
  {id: 2, title: 'Oranges', price: 30, img: 'images/fruits/orange.jpg'},
  {id: 3, title: 'Mango', price: 40, img: 'images/fruits/mango.jpg'},
]

const toHtml = fruits => `
  <div class="fruit_item">
    <img src="${fruits.img}" alt="${fruits.title}">

    <div class="fruit_text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorem minus praesentium  recusandae reprehenderit ut beatae, exercitationem quos, vel unde culpa! Obcaecati temporibus voluptate porro, dicta earum autem dolorum excepturi?
    </div>

    <div class="fruit_btn">
      <button class="fruit_PriceBTN" data-btn="price" data-id="${fruits.id}">Price</button>
      <button class="fruit_DeleteBTN" data-btn="delete" data-id="${fruits.id}">Delete</button>
    </div>
  </div>
`

const modalFruits = _$.modal({
  title: 'Your price',

  closable: true,
  modalOpeningBool: true,

  width: '400px',
  height: '150px',

  buttons: [{
      text: 'OK', type: 'okk', handle() {
        modalFruits.close();
      }
    },
  ],
})

const modal = _$.modal({
  title: 'Window modal',
  content: `<span>Yes, it works</span>`,

  closable: true,
  modalOpeningBool: true,

  height: '150px',
  width: '400px',

  buttons: [{
      text: 'OK', type: 'okk', handle() {
        modal.close();
      }
    },
    
      { 
      text: 'Cancel', type: 'cancel', handle() {
        modal.close();
      }
    }
  ],
})

function render() {
  const html = fruits.map(toHtml).join('')
  document.querySelector('#fruitss').innerHTML = html
}

document.addEventListener('click', event => {
  const dataBtn = event.target.dataset.btn
  const fruitId = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === fruitId)

  if(dataBtn === 'price'){
    modalFruits.setContent(`
      <p class="fruit_price">Price on ${fruit.title} = <strong>${fruit.price}$</strong></p>
    `)

    modalFruits.open()
  } else if(dataBtn === 'delete'){

    _$.confirm({
      title: 'Are you sure?',
      content: `<p>You are deleting the fruit <strong>${fruit.title}</strong></p>`,
    }).then(() => { 
      fruits = fruits.filter(f => f.id !== fruitId)
      render()
    }).catch(() => {
    })
  }
})

render()