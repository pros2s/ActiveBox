Element.prototype.appendDownModal = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}


//Функция создания кнопок (footer)
const _createButtons = (buttons = []) => {
  if(buttons.length === 0) return

  const DIVbuttons = document.createElement('div')
  DIVbuttons.classList.add('modal_buttons')
  
  buttons.forEach( btn => {
    const DIVbtn = document.createElement('a')

    DIVbtn.textContent = btn.text
    DIVbtn.classList.add('modal_btn')
    DIVbtn.classList.add(`modal_btn_${ btn.type }`)
    DIVbtn.onclick = btn.handle

    DIVbuttons.appendChild(DIVbtn)
  })

  return DIVbuttons
}


//Функция создания модального окна
const _createModal = options => {
  const DEFAULT_WIDTH = '500px'
  const DEFAULT_HEIGHT = '300px'
  const DEFAULT_TITLE = 'Window'

  const DIVmodal = document.createElement('div')
  DIVmodal.classList.add('amodal')

  DIVmodal.insertAdjacentHTML('afterBegin', `
    <div class="modal_overlay" ${ options.closable ? `data-close="true"` : ''}>
      <div class="modal_content" style="height: ${ options.height || DEFAULT_HEIGHT }; width: ${ options.width || DEFAULT_WIDTH }">

        <div class="modal_title">
          <p>${ options.title || DEFAULT_TITLE }</p>
          ${ options.closable ? `<button class="modal_close" data-close="true">&times;</button>` : '' }
        </div>

        <div class="modal_text"  data-content>
          ${ options.content || '' }
        </div>
        
      </div>
    </div>

    ${ options.modalOpeningBool ? `<div class="modal_opening" data-open="true"></div>` : ''}
  `)

  //Добавляем кнопки(footer) в конец модального окна
  const footer = _createButtons(options.buttons)
  footer.appendDownModal(DIVmodal.querySelector('[data-content]'))

  //Добавляем модальное окно в конец body
  document.body.appendChild(DIVmodal)
  return DIVmodal
}


//Основной метод работы модального окна (весь функционал)
_$.modal = options => {
  const TIMEOUT = 200;

  let closing = false
  let destroyed = false

  const $modal = _createModal(options) //Модальное окно

  //Объект, отвечающий за появление и удаления модального окна
  const openClose = {
    // Появление модального окна
    open() {
      if(destroyed) console.log('Window has been destroyed')

      !closing && $modal.classList.add('open')
    },

    // Закрытие модального окна
    close() {
      closing = true

      $modal.classList.remove('open')
      $modal.classList.add('hide')

      setTimeout(() => {
        $modal.classList.remove('hide')

        if(typeof options.onClose === 'function'){
          options.onClose()
        }

        closing = false
      }, TIMEOUT);
    },
  }

  //Нажатие на кнопку открытия модалки
  const MBListener = event => {
    if(event.target.dataset.open) {
      openClose.open()
    }
  }
  $modal.addEventListener('click', MBListener)

  //Нажатие на крестик - закрытие
  const listener = event => {
    if(event.target.dataset.close){
      openClose.close()
    }
  }
  $modal.addEventListener('click', listener)

  //Return
  return Object.assign(openClose, {
    // Уничтожение(очистка) модального окна
    destroy() {
      destroyed = true

      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      $modal.removeEventListener('click', MBListener)
    },

    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}