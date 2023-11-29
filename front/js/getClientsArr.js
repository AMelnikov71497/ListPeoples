export async function getClientsArr() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    localStorage.setItem('client', JSON.stringify(data)) 
  }