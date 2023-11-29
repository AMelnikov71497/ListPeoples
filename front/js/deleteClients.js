export async function deleteClients(deleteClient) {
    const response = await fetch(`http://localhost:3000/api/clients/${deleteClient}`, {
        method: 'DELETE'
      });
}
