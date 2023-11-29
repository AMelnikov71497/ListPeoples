export async function searchClients() {
    let headerInputSearch = document.getElementById("header__input-search")
    const response = await fetch(`http://localhost:3000/api/clients?search=${headerInputSearch.value}`);
    const data = await response.json();
    localStorage.setItem('client', JSON.stringify(data))
}