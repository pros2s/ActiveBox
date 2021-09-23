_$.confirm = function(options){
  return new Promise((resolve, reject) => {
    const modalConfirm = _$.modal({
      title: options.title,
      content: options.content,
      modalOpeningBool: false,

      height: '200px',
      width: '350px',

      closable: false,

      onClose(){
        modalConfirm.destroy()
      },

      buttons: [
        {text: 'Cancel', type: 'fruit_cancel', handle() {
          modalConfirm.close()
          reject()
        }},
        {text: 'Delete', type: 'fruit_delete', handle() {
          modalConfirm.close()
          resolve()
        }}
      ]
    })

    setTimeout(() => modalConfirm.open(), 100)
  })
}