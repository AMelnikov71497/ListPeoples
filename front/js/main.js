import { searchClients } from "./searchClients.js";
import { addClients } from "./addClients.js";
import { getClientsArr } from "./getClientsArr.js";
import { updateClientFn } from "./updateClientFn.js";
import { deleteClients } from "./deleteClients.js";

//Поиск
let formBlockInput = document.querySelector(".form__block-input")
formBlockInput.addEventListener("submit", async (event) => {
  event.preventDefault()
  let headerInputSearch = document.getElementById("header__input-search")
  //await searchClients()
  let listClientsArray = JSON.parse(localStorage.getItem('client'))

  if(headerInputSearch.value !== '') {
    listClientsArray = listClientsArray.filter((item) => {
        if(item.fio.includes(headerInputSearch.value)) return true
    })
  }

  localStorage.setItem('client', JSON.stringify(listClientsArray))

  if(headerInputSearch.value == '') {
    const response = await fetch("http://localhost:3000/api/clients");
    const data = await response.json();
    localStorage.setItem('client', JSON.stringify(data))
  }

  document.querySelector(".tbody").innerHTML = '';
  renderClient()
})


//Модальное окно добавить нового клиента
function modalWindowAddClient() {
  let bodyGrayFon = document.createElement("div");
  bodyGrayFon.classList.add("bodyGrayFon", "bodyGrayFon--active")
  document.body.append(bodyGrayFon)



  let parentModalAddClient = document.createElement("div")
  parentModalAddClient.classList.add("parentModalAddClient")
  document.body.append(parentModalAddClient)

  let modalAddClient = document.createElement("div");
  modalAddClient.classList.add("modalAddClient")
  parentModalAddClient.append(modalAddClient)
  
  let modalAddBtnClose = document.createElement("button");
  modalAddBtnClose.classList.add("modalAddClient-btnClose");
  modalAddClient.append(modalAddBtnClose);

  modalAddBtnClose.addEventListener("click", () => {
    modalAddClient.remove()
    bodyGrayFon.remove()
    parentModalAddClient.remove()
  })
  
  let titleNewClient = document.createElement("h2");
  titleNewClient.textContent = "Новый клиент";
  titleNewClient.classList.add("title-new-client");
  modalAddClient.append(titleNewClient);
  
  let formNewClient = document.createElement("form");
  formNewClient.action = "#";
  formNewClient.classList.add("formNewClient");
  formNewClient.id = "formNewClient";
  modalAddClient.append(formNewClient);

  let labelSurName = document.createElement("label");
  labelSurName.classList.add("labelSurName", "flex");
  formNewClient.append(labelSurName);

  let inputSurname = document.createElement("input");
  inputSurname.type = "text";
  inputSurname.classList.add("inputSurname");
  inputSurname.id = "inputSurname";
  inputSurname.placeholder = "Фамилия";
  labelSurName.append(inputSurname);

  let labelName = document.createElement("label");
  labelName.classList.add("labelName", "flex");
  formNewClient.append(labelName);

  let inputName = document.createElement("input");
  inputName.type = "text";
  inputName.classList.add("inputName");
  inputName.id = "inputName";
  inputName.placeholder = "Имя";
  labelName.append(inputName);

  let labelLastName = document.createElement("label");
  labelLastName.classList.add("labelLastName", "flex");
  formNewClient.append(labelLastName);

  let inputLastname = document.createElement("input");
  inputLastname.type = "text";
  inputLastname.classList.add("inputLastname");
  inputLastname.id = "inputLastname";
  inputLastname.placeholder = "Отчество";
  labelLastName.append(inputLastname);

  let divcontacts = document.createElement("div");
  divcontacts.id = "divcontacts";
  formNewClient.append(divcontacts)

  function blockContacts() {

  let blockAddContact = document.createElement("div");
  blockAddContact.classList.add("blockAddContact")
  
  divcontacts.style.padding = "10px"
  divcontacts.append(blockAddContact)

  let divSelect = document.createElement("div");
  divSelect.classList.add("divSelect")
  blockAddContact.append(divSelect)

  let divSelectHeader = document.createElement("div")
  divSelectHeader.classList.add("divSelectHeader")
  divSelect.append(divSelectHeader)

  divSelectHeader.addEventListener("click", () => {
    divSelectBody.classList.toggle("divSelectBody--active")
    iconHeaderSpan.classList.toggle("iconHeaderSpan--active")
  })

  let divSelectHeaderSpan = document.createElement("span")
  divSelectHeaderSpan.classList.add("divSelectHeaderSpan")
  divSelectHeaderSpan.textContent = "Телефон"
  divSelectHeader.append(divSelectHeaderSpan)

  let iconHeaderSpan = document.createElement("div")
  iconHeaderSpan.classList.add("iconHeaderSpan")
  divSelectHeader.append(iconHeaderSpan)

  let divSelectBody = document.createElement("div")
  divSelectBody.classList.add("divSelectBody")
  divSelect.append(divSelectBody)

  let span0 = document.createElement("span")
  span0.textContent = "Телефон";
  span0.classList.add("span0", "spansContact")
  divSelectBody.append(span0)

  let span1 = document.createElement("span")
  span1.textContent = "Email";
  span1.classList.add("span1", "spansContact")
  divSelectBody.append(span1)

  let span2 = document.createElement("span")
  span2.textContent = "Vk";
  span2.classList.add("span2", "spansContact")
  divSelectBody.append(span2)

  let span3 = document.createElement("span")
  span3.textContent =  "Facebook";
  span3.classList.add("span3", "spansContact")
  divSelectBody.append(span3)

  let inputContact = document.createElement("input");
  inputContact.type = "tel";
  inputContact.placeholder = "Введите телефон";
  inputContact.classList.add("inputContact");

  let spansContact = document.querySelectorAll(".spansContact")
  spansContact.forEach(item => {
    item.addEventListener("click", (event) => {
      let itemCurrent = event.currentTarget
      divSelectHeaderSpan.textContent = itemCurrent.textContent
      if(divSelectHeaderSpan.textContent == "Телефон") {
        inputContact.type = "tel"
        inputContact.placeholder = "Введите телефон"
      }
      if(divSelectHeaderSpan.textContent == "Email") {
        inputContact.type = "mail"
        inputContact.placeholder = "Введите Email"
      }
      if(divSelectHeaderSpan.textContent == "Vk") {
        inputContact.type = "text"
        inputContact.placeholder = "Введите Vk"
      }
      if(divSelectHeaderSpan.textContent == "Facebook") {
        inputContact.type = "text"
        inputContact.placeholder = "Введите Facebook"
      }
      iconHeaderSpan.classList.remove("iconHeaderSpan--active")
      divSelectBody.classList.remove("divSelectBody--active")
    })
  })

  blockAddContact.append(inputContact)

  let btnIbputDelete = document.createElement("button");
  let iconDeleteInputPath = './img/del.svg';
  let iconDeleteInputImg = document.createElement("img");
  iconDeleteInputImg.classList.add("iconDeleteInputImg")
  iconDeleteInputImg.src = iconDeleteInputPath;
  btnIbputDelete.append(iconDeleteInputImg)
  blockAddContact.append(btnIbputDelete)
  
  btnIbputDelete.addEventListener("click", (event) => {
  if(btnAddContacts.classList.contains("btnAddContactNone")) {
      btnAddContacts.classList.remove("btnAddContactNone")
  }
  let btnDeleteTarget = event.currentTarget;
  btnDeleteTarget.parentElement.remove()
  divcontacts.style.padding = "0";
  })

  }

  let btnAddContacts = document.createElement("div");
  btnAddContacts.classList.add("btnAddContacts");

  let iconAddContacts = document.createElement("img")
  iconAddContacts.classList.add("iconAddContacts")
  iconAddContacts.src = "./img/iconPlus.svg"

  btnAddContacts.textContent = "Добавить контакт";
  
  btnAddContacts.prepend(iconAddContacts)
  formNewClient.append(btnAddContacts)
  
  btnAddContacts.addEventListener("click", () => {
    let arrayblockContacts = []
    blockContacts()
    let blockAddContact = document.querySelectorAll(".blockAddContact") 
    for(let item of blockAddContact) {
      arrayblockContacts.push(item)
      if(arrayblockContacts.length >= 10) {
       btnAddContacts.classList.add("btnAddContactNone")
      }
    }
  
  })

  let btnAddClient = document.createElement("button");
  btnAddClient.type = "submit";
  btnAddClient.classList.add("btnAddClient");
  btnAddClient.textContent = "Сохранить";
  formNewClient.append(btnAddClient)

  let btnClose = document.createElement("button");
  btnClose.classList.add("btnClose")
  btnClose.textContent = "Отмена";
  modalAddClient.append(btnClose)
  btnClose.addEventListener("click", () => {
    bodyGrayFon.remove()
    modalAddClient.remove()
  })


  //Валидация формы новый клиент
  let validation = new JustValidate('#formNewClient', {
    errorLabelStyle: {
        color: "red"
      }
  })
  validation.addField("#inputSurname", [
    {
      rule: "required",
      errorMessage: "Вы не ввели фамилию",
    },
  
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимальня длина имени 2 символа",
    },
    {
      rule: "maxLength",
      value: 20,
      errorMessage: "Максимальная длина имени 20 символов",
    }
  ])
  validation.addField("#inputName", [
    {
      rule: "required",
      errorMessage: "Вы не ввели имя",
    },
  
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимальня длина имени 2 символа",
    },
    {
      rule: "maxLength",
      value: 20,
      errorMessage: "Максимальная длина имени 20 символов",
    }
  ])
  validation.addField("#inputLastname", [
    {
      rule: "required",
      errorMessage: "Вы не ввели отчество",
    },
  
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимальня длина имени 2 символа",
    },
    {
      rule: "maxLength",
      value: 20,
      errorMessage: "Максимальная длина имени 20 символов",
    }
  ])

  
  formNewClient.addEventListener("submit", async function(event) {
    event.preventDefault()

    await addClients()

    await getClientsArr()

    document.querySelector(".tbody").innerHTML = '';

    renderClient()

    document.getElementById("inputSurname").value = '';
    document.getElementById("inputName").value = '';
    document.getElementById("inputLastname").value = '';

    document.querySelector(".modalAddClient").remove()
    document.querySelector(".bodyGrayFon").remove()
    document.querySelector(".parentModalAddClient").remove()
  })
}

let addClientBtn = document.querySelector(".addClintBtn");
addClientBtn.addEventListener("click", () => {
  modalWindowAddClient()
})

//Отрисовка
function renderClient() {
  let listClientsArray = JSON.parse(localStorage.getItem('client'))
  for(let item of listClientsArray) {
    let tbody = document.querySelector(".tbody");
    tbody.style.backgroundColor = "white";
    
    let oneClient = document.createElement("tr");
    tbody.append(oneClient);
  
    let clientId = document.createElement("th");
    let clientFIO = document.createElement("th");
    let clientCreateAt = document.createElement("th");
    let clientUpdateAt = document.createElement("th");
    let contacts = document.createElement("th");
    let buttonsTh = document.createElement("th");

    clientId.classList.add("clientThStyle", "clientThId");
    clientFIO.classList.add("clientThStyle");
    clientCreateAt.classList.add("clientThStyle", "clientCreateAt");
    clientUpdateAt.classList.add("clientThStyle");
    contacts.classList.add("clientThStyle", "contactsTh");
  
    buttonsTh.style.display = 'flex';
  
    let buttonUpdate = document.createElement("button");
    buttonUpdate.style.marginRight = '40px';
    buttonUpdate.classList.add("buttonUpdate")
    buttonUpdate.textContent = 'Изменить';
    let imgPen = document.createElement("img");
    imgPen.src = './img/pen.svg';
    buttonUpdate.prepend(imgPen)

    
    
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = 'Удалить';
    buttonDelete.classList.add("buttonDelete")
    let imgDelete = document.createElement("img");
    imgDelete.src = './img/iconDelete.svg';
    buttonDelete.prepend(imgDelete)
  
    buttonsTh.append(buttonUpdate)
    buttonsTh.append(buttonDelete)

      buttonUpdate.addEventListener("click", (event) => {
        let item = event.currentTarget
        updateClientModal(item)
      })

      buttonDelete.addEventListener("click", (event) => {
        let item = event.currentTarget
        modalDeleteClient(item.dataset.id)

      })
    
  
    buttonsTh.classList.add("clientThStyle")
  
    oneClient.append(clientId);
    oneClient.append(clientFIO);
    oneClient.append(clientCreateAt);
    oneClient.append(clientUpdateAt);
    oneClient.append(contacts);
    oneClient.append(buttonsTh);
  
    clientId.textContent = item.id;
    item.fio = item.surname + ' ' + item.name + ' ' + item.lastName
    clientFIO.textContent = item.fio;

    clientCreateAt.textContent = getDate(new Date(item.createdAt));

    clientUpdateAt.textContent = getDate(new Date(item.updatedAt));

    function getDate(data) {
      let result = data.getDate() < 10 ? '0' + data.getDate() + '.' : data.getDate() + '.';
      result = result + (data.getMonth() < 10 ? '0' + (data.getMonth() + 1) + '.' : (data.getMonth() + 1) + '.');
      result = result + data.getFullYear()
      return result
  }

      let spanTimeCreate = document.createElement("span")
      spanTimeCreate.style.color = "#B0B0B0"
      spanTimeCreate.textContent = ' ' + (new Date(item.createdAt).getHours() < 10 ? '0' + new Date(item.createdAt).getHours() : new Date(item.createdAt).getHours()) + ':' + (new Date(item.createdAt).getMinutes() < 10 ? '0' + new Date(item.createdAt).getMinutes() : new Date(item.createdAt).getMinutes())
      clientCreateAt.append(spanTimeCreate)
  
      let spanTimeUpdate = document.createElement("span")
      spanTimeUpdate.style.color = "#B0B0B0"
      spanTimeUpdate.textContent = ' ' + (new Date(item.updatedAt).getHours() < 10 ? '0' + new Date(item.updatedAt).getHours() : new Date(item.updatedAt).getHours()) + ':' + (new Date(item.updatedAt).getMinutes() < 10 ? '0' + new Date(item.updatedAt).getMinutes() : new Date(item.updatedAt).getMinutes())
      clientUpdateAt.append(spanTimeUpdate)

    let buttonsUpdate = document.querySelectorAll(".buttonUpdate");
    let buttonsDelete = document.querySelectorAll(".buttonDelete");
    let clientThId = document.querySelectorAll(".clientThId");

    for(let i = 0; i < clientThId.length; i++) {
    buttonsUpdate[i].dataset.id = clientThId[i].textContent;
    buttonsDelete[i].dataset.id = clientThId[i].textContent;
    }

      item.contacts.forEach(clientValue => {
        if(clientValue.type == "Телефон") {
            let contactsLinkPhone = document.createElement("a")
            contactsLinkPhone.classList.add("contactsLinkPhone")
            contactsLinkPhone.href = "#"

            let tooltipTel = document.createElement("div")
            tooltipTel.textContent = "+" + clientValue.value
            tooltipTel.classList.add("tooltipTel", "tooltip")
            contactsLinkPhone.append(tooltipTel)

            let arrowTooltip = document.createElement("div")
            arrowTooltip.classList.add("arrowTooltip")
            tooltipTel.append(arrowTooltip)

            
            let contactsImgPhone = document.createElement("img")
            contactsImgPhone.src = './img/phone.svg'
            contactsLinkPhone.append(contactsImgPhone)
            contacts.append(contactsLinkPhone)
        }
        if(clientValue.type == "Vk") {
          let contactsLinkVk = document.createElement("a")
          contactsLinkVk.classList.add("contactsLinkVk")
          contactsLinkVk.href = "#"

          let tooltipVk = document.createElement("div")
          tooltipVk.textContent = "Vk:" + clientValue.value
          tooltipVk.classList.add("tooltipVk", "tooltip")
          contactsLinkVk.append(tooltipVk)

          let arrowTooltip = document.createElement("div")
          arrowTooltip.classList.add("arrowTooltip")
          tooltipVk.append(arrowTooltip)

          let contactsImgVk = document.createElement("img")
          contactsImgVk.src = './img/vk.svg'
          contactsLinkVk.append(contactsImgVk)
          contacts.append(contactsLinkVk)
        } 
        if(clientValue.type == "Facebook") {
          let contactsLinkFb = document.createElement("a")
          contactsLinkFb.classList.add("contactsLinkFb")
          contactsLinkFb.href = "#"

          let tooltipFb = document.createElement("div")
          tooltipFb.textContent = "Fb:" + clientValue.value
          tooltipFb.classList.add("tooltipFb", "tooltip")
          contactsLinkFb.append(tooltipFb)

          let arrowTooltip = document.createElement("div")
            arrowTooltip.classList.add("arrowTooltip")
            tooltipFb.append(arrowTooltip)


          let contactsImgFb = document.createElement("img")
          contactsImgFb.src = './img/fb.svg'
          contactsLinkFb.append(contactsImgFb)
          contacts.append(contactsLinkFb)
        }
        if(clientValue.type == "Email") {
          let contactsLinkEmail = document.createElement("a")
          contactsLinkEmail.classList.add("contactsLinkEmail")
          contactsLinkEmail.href = "#"

          let tooltipEmail = document.createElement("div")
          tooltipEmail.textContent = "Email:" + clientValue.value
          tooltipEmail.classList.add("tooltipEmail", "tooltip")
          contactsLinkEmail.append(tooltipEmail)

          let arrowTooltip = document.createElement("div")
            arrowTooltip.classList.add("arrowTooltip")
            tooltipEmail.append(arrowTooltip)


          let contactsImgEmail = document.createElement("img")
          contactsImgEmail.src = './img/mail.svg'
          contactsLinkEmail.append(contactsImgEmail)
          contacts.append(contactsLinkEmail)
        }
      })
    
    
  }

  localStorage.setItem('client', JSON.stringify(listClientsArray))
 
}

renderClient()

//Сортировка
let sortColumnFlag = 'fio';
let sortDirFlag = true;

function sortClients() {
  let clientArrayLocal = JSON.parse(localStorage.getItem('client'))

  for(let item of clientArrayLocal) {
    item.fio = item.surname + ' ' + item.name + ' ' + item.lastName
  }

  clientArrayLocal = clientArrayLocal.sort((a, b) => {
    let sort = a[sortColumnFlag] < b[sortColumnFlag]
    if(sortDirFlag == false) {
      sort = a[sortColumnFlag] > b[sortColumnFlag]
    }
    if(sort) {
      return -1
  }
  })
  localStorage.setItem('client', JSON.stringify(clientArrayLocal))
}

let clientId = document.querySelector(".thTitleId")
clientId.addEventListener("click", () => {
  sortColumnFlag = 'id'
  sortDirFlag = !sortDirFlag
  document.querySelector(".tbody").innerHTML = '';
  sortClients()
  renderClient() 
})


let clientFio = document.querySelector(".thTitleFio")
clientFio.addEventListener("click", () => {
  sortColumnFlag = 'fio';
  sortDirFlag = !sortDirFlag;
  document.querySelector(".tbody").innerHTML = '';
  sortClients()
  renderClient() 
})

let clientCrete = document.querySelector(".thTitleCreate")
clientCrete.addEventListener("click", () => {
  sortColumnFlag = 'createdAt';
  sortDirFlag = !sortDirFlag;
  document.querySelector(".tbody").innerHTML = '';
  sortClients()
  renderClient()
})

let clientUpdate = document.querySelector(".thTitleUpdate")
clientUpdate.addEventListener("click", () => {
  sortColumnFlag = 'updatedAt'
  sortDirFlag = !sortDirFlag
  document.querySelector(".tbody").innerHTML = '';
  sortClients()
  renderClient()
})

//Изменение 

function updateClientModal(item) {
  
  let parentUpdateClientDate = document.createElement("div")
  parentUpdateClientDate.classList.add("parentUpdateClientDate", "parentUpdateClientDate--active")
  document.body.append(parentUpdateClientDate)

  let updateClientDate = document.createElement("div");
    updateClientDate.classList.add("updateClientDate");
    parentUpdateClientDate.append(updateClientDate);

  
    let updateClientTitle = document.createElement("h2");
    updateClientTitle.classList.add("updateClientTitle")
    updateClientTitle.textContent = "Изменить данные";
    updateClientDate.append(updateClientTitle);
  
    
    let bodyGrayFon = document.createElement("div");
    bodyGrayFon.classList.add("bodyGrayFon", "bodyGrayFon--active");
    document.body.append(bodyGrayFon);
  
  
      let spanIdClient = document.createElement("span");
      spanIdClient.classList.add("spanIdClient")
      spanIdClient.textContent = "ID:" + item.dataset.id;
      document.querySelector(".updateClientDate").append(spanIdClient);
  
      let updateClientBtnClose = document.createElement("button");
      updateClientBtnClose.classList.add("updateClientBtnClose");
      updateClientDate.append(updateClientBtnClose);
  
      updateClientBtnClose.addEventListener("click", () => {
        updateClientDate.remove();
        bodyGrayFon.remove();
        parentUpdateClientDate.remove()
      })
  
      let updateClientForm = document.createElement("form");
      updateClientForm.id = "updateClientForm";
      updateClientDate.append(updateClientForm);
      
      
      let updateInputSurname = document.createElement("input");
      updateInputSurname.classList.add("updateInputSurname");
      updateInputSurname.placeholder = "Фамилия*";
      updateClientForm.append(updateInputSurname);
  
      let updateInputName = document.createElement("input");
      updateInputName.classList.add("updateInputName");
      updateInputName.placeholder = "Имя*";
      updateClientForm.append(updateInputName);
  
      let updateInputLastname = document.createElement("input");
      updateInputLastname.classList.add("updateInputLastname");
      updateInputLastname.placeholder = "Отчество*";
      updateClientForm.append(updateInputLastname);

      async function valueClientsUpdate(itemDataSet) {
        const response = await fetch(`http://localhost:3000/api/clients/${itemDataSet}`);
        const data = await response.json();
        
        updateInputSurname.value = data.surname
        updateInputName.value = data.name
        updateInputLastname.value = data.lastName
      }

      valueClientsUpdate(item.dataset.id)
  
  
      let divcontactsUpdate = document.createElement("div");
      divcontactsUpdate.id = "divcontactsUpdate";
      updateClientForm.append(divcontactsUpdate)

      let btnAddContacts = document.createElement("div");
      btnAddContacts.classList.add("btnAddContacts");


      let iconAddContacts = document.createElement("img")
      iconAddContacts.classList.add("iconAddContacts")
      iconAddContacts.src = "./img/iconPlus.svg"
      

      btnAddContacts.textContent = "Добавить контакт";
      btnAddContacts.prepend(iconAddContacts)
      updateClientForm.append(btnAddContacts)
  
    function blockContactsUpdate() {
        
    let blockAddContact = document.createElement("div");
    blockAddContact.classList.add("blockAddContact")
    divcontactsUpdate.style.padding = "10px"
    divcontactsUpdate.append(blockAddContact)


  let divSelect = document.createElement("div");
  divSelect.classList.add("divSelect")
  blockAddContact.append(divSelect)

  let divSelectHeader = document.createElement("div")
  divSelectHeader.classList.add("divSelectHeader")
  divSelect.append(divSelectHeader)

  divSelectHeader.addEventListener("click", () => {
    divSelectBody.classList.toggle("divSelectBody--active")
    iconHeaderSpan.classList.toggle("iconHeaderSpan--active")
  })

  let divSelectHeaderSpan = document.createElement("span")
  divSelectHeaderSpan.classList.add("divSelectHeaderSpan")
  divSelectHeaderSpan.textContent = "Телефон"
  divSelectHeader.append(divSelectHeaderSpan)

  let iconHeaderSpan = document.createElement("div")
  iconHeaderSpan.classList.add("iconHeaderSpan")
  divSelectHeader.append(iconHeaderSpan)


  let divSelectBody = document.createElement("div")
  divSelectBody.classList.add("divSelectBody")
  divSelect.append(divSelectBody)

  let span0 = document.createElement("span")
  span0.textContent = "Телефон"
  span0.classList.add("span0", "spansContact")
  divSelectBody.append(span0)

  let span1 = document.createElement("span")
  span1.textContent = "Email"
  span1.classList.add("span1", "spansContact")
  divSelectBody.append(span1)

  let span2 = document.createElement("span")
  span2.textContent = "Vk"
  span2.classList.add("span2", "spansContact")
  divSelectBody.append(span2)

  let span3 = document.createElement("span")
  span3.textContent =  "Facebook"
  span3.classList.add("span3", "spansContact")
  divSelectBody.append(span3)

  let spansContact = document.querySelectorAll(".spansContact")
  spansContact.forEach(item => {
    item.addEventListener("click", (event) => {
      let itemCurrent = event.currentTarget
      divSelectHeaderSpan.textContent = itemCurrent.textContent
      if(divSelectHeaderSpan.textContent == "Телефон") {
        inputContact.type = "tel"
        inputContact.placeholder = "Введите телефон"
      }
      if(divSelectHeaderSpan.textContent == "Email") {
        inputContact.type = "mail"
        inputContact.placeholder = "Введите Email"

      }
      if(divSelectHeaderSpan.textContent == "Vk") {
        inputContact.type = "text"
        inputContact.placeholder = "Введите Vk"
      }
      if(divSelectHeaderSpan.textContent == "Facebook") {
        inputContact.type = "text"
        inputContact.placeholder = "Введите Facebook"
      }

      iconHeaderSpan.classList.remove("iconHeaderSpan--active")
      divSelectBody.classList.remove("divSelectBody--active")
      
    })
  })


    let inputContact = document.createElement("input");
    inputContact.classList.add("inputContact")
    inputContact.type = "tel";
    inputContact.placeholder = "Введите телефон";
    blockAddContact.append(inputContact)

    let btnIbputDelete = document.createElement("button");
    btnIbputDelete.classList.add("btnIbputDelete")
  
    let iconDeleteInputPath = './img/del.svg';
    let iconDeleteInputImg = document.createElement("img");
    iconDeleteInputImg.src = iconDeleteInputPath;
    btnIbputDelete.append(iconDeleteInputImg)
    blockAddContact.append(btnIbputDelete)
  
    btnIbputDelete.addEventListener("click", (event) => {
      if(btnAddContacts.classList.contains("btnAddContactNone")) {
        btnAddContacts.classList.remove("btnAddContactNone")
    }  
    let btnDeleteTarget = event.currentTarget
    btnDeleteTarget.parentElement.remove()
    divcontactsUpdate.style.padding = "0"
    })
  
    }
    
    async function result(itemDatasetId) {
      const response = await fetch(`http://localhost:3000/api/clients/${itemDatasetId}`);
      const data = await response.json();
      
      for(let i = 0; i < data.contacts.length; i++) {
        blockContactsUpdate()
        let divSelectHeaderSpan = document.querySelectorAll(".divSelectHeaderSpan")
        let inputContact = document.querySelectorAll(".inputContact")
        divSelectHeaderSpan[i].textContent = data.contacts[i].type
        inputContact[i].value = data.contacts[i].value
      }
    }

    result(item.dataset.id)
   
      btnAddContacts.addEventListener("click", () => {
        blockContactsUpdate()
        let arrayblockContacts = []
        let blockAddContact = document.querySelectorAll(".blockAddContact") 
        for(let item of blockAddContact) {
        arrayblockContacts.push(item)
        if(arrayblockContacts.length >= 10) {
         btnAddContacts.classList.add("btnAddContactNone")
       }
    }

      })
  
      let btnUpdateClient = document.createElement("button");
      btnUpdateClient.type = "submit";
      btnUpdateClient.classList.add("btnUpdateClient");
      btnUpdateClient.textContent = "Сохранить";
      updateClientForm.append(btnUpdateClient)

      updateClientForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        
        await updateClientFn(item.dataset.id, updateInputName, updateInputSurname, updateInputLastname)
          
          document.querySelector(".tbody").innerHTML = '';

          const responseNew = await fetch('http://localhost:3000/api/clients');
          const dataNew = await responseNew.json();

          localStorage.setItem('client', JSON.stringify(dataNew))
          
          renderClient()

          updateClientDate.remove()
          bodyGrayFon.remove()
          parentUpdateClientDate.remove()
      })
  
      let btnCloseUpdate = document.createElement("button");
      btnCloseUpdate.classList.add("btnCloseUpdate")
      btnCloseUpdate.textContent = "Отмена";
      updateClientDate.append(btnCloseUpdate)

      btnCloseUpdate.addEventListener("click", () => {
        updateClientDate.remove()
        bodyGrayFon.remove()
        parentUpdateClientDate.remove()

      })
      
}

//Удаление 

function modalDeleteClient(datesetDeleteBtn) {
  let bodyGrayFon = document.createElement("div");
  bodyGrayFon.classList.add("bodyGrayFon", "bodyGrayFon--active")
  document.body.append(bodyGrayFon)

  let parentBlockModalDelete = document.createElement("div")
  parentBlockModalDelete.classList.add("parentBlockModalDelete", "parentBlockModalDelete--active")
  document.body.append(parentBlockModalDelete)


  let blockModalDelete = document.createElement("div");
  blockModalDelete.classList.add("blockModalDelete")
  parentBlockModalDelete.append(blockModalDelete)

  let titleblockModalDelete = document.createElement("h2")
  titleblockModalDelete.classList.add("titleblockModalDelete")
  titleblockModalDelete.textContent = "Удалить клиента"
  blockModalDelete.append(titleblockModalDelete)

  let deleteClientBtnClose = document.createElement("button")
  deleteClientBtnClose.classList.add("deleteClientBtnClose")
  blockModalDelete.append(deleteClientBtnClose)

  deleteClientBtnClose.addEventListener("click", () => {
    blockModalDelete.remove()
    bodyGrayFon.remove()
    parentBlockModalDelete.remove()
  })

  let blockModalDeleteText =  document.createElement("p");
  blockModalDeleteText.classList.add("blockModalDeleteText");
  blockModalDeleteText.textContent = "Вы действительно хотите удалить данного клиента?"
  blockModalDelete.append(blockModalDeleteText);

  let deleteClientBtn = document.createElement("button");
  deleteClientBtn.classList.add("deleteClientBtn");
  deleteClientBtn.textContent = "Удалить";
  deleteClientBtn.dataset.id = datesetDeleteBtn;
  blockModalDelete.append(deleteClientBtn)

  deleteClientBtn.addEventListener("click", async () => {
    
    await deleteClients(deleteClientBtn.dataset.id)

          const responseNew = await fetch('http://localhost:3000/api/clients');
          const dataNew = await responseNew.json();

          localStorage.setItem('client', JSON.stringify(dataNew))

          document.querySelector(".tbody").innerHTML = '';

          renderClient()

          blockModalDelete.remove()
          bodyGrayFon.remove()
          parentBlockModalDelete.remove()
  })

  let blockModalDeleteBtnReset = document.createElement("button");
  blockModalDeleteBtnReset.textContent = "Отмена";
  blockModalDelete.append(blockModalDeleteBtnReset);

  blockModalDeleteBtnReset.addEventListener("click", () => {
   blockModalDelete.remove()
   bodyGrayFon.remove()
   parentBlockModalDelete.remove()


  })

}

//let buttonDelete = document.querySelectorAll(".buttonDelete");

  



  
   
  









  








    





 


