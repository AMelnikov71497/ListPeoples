export async function updateClientFn(updateClientId, updateInputName, updateInputSurname, updateInputLastname) {
    function contactsClient() {
        let contacts = [];
      
        let divSelectHeaderSpan = document.querySelectorAll(".divSelectHeaderSpan")
        let inputContact = document.querySelectorAll(".inputContact")
      
        for(let i = 0; i < divSelectHeaderSpan.length; i++) {
              contacts.push({
                type: divSelectHeaderSpan[i].textContent,
                value: inputContact[i].value
              })
        }
        
        return contacts;
    }

    const response = await fetch(`http://localhost:3000/api/clients/${updateClientId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        name: updateInputName.value,
        surname: updateInputSurname.value,
        lastName: updateInputLastname.value,
        contacts: contactsClient()

      })
    });
    const data = await response.json();
  }
