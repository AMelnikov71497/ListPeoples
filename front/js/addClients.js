export async function addClients() {

    function contactsClient() {
        let contacts = [];
      
        let divSelectHeaderSpan = document.querySelectorAll(".divSelectHeaderSpan")
        let inputGlobal = document.querySelectorAll(".inputContact")
        for(let i = 0; i < divSelectHeaderSpan.length; i++) {
              contacts.push({
                type: divSelectHeaderSpan[i].textContent,
                value: inputGlobal[i].value
              })
        }
        
        return contacts;
    }

    const response2 = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          name: document.querySelector(".inputName").value,
          surname: document.querySelector(".inputSurname").value,
          lastName: document.querySelector(".inputLastname").value,
          contacts: contactsClient() 
        }),
        headers: { 'Content-Type': 'application/json' },
        });
        let data2 = await response2.json();

        
        return data2;
        
        
  }