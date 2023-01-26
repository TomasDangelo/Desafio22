(async () => {
    try {
      const respuesta = await fetch('/api/datos', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
  
      if (respuesta.status != 200) {
        return location.href = '/noAutorizado.html'
      }
  
    } catch (error) {
      document.querySelector('main').innerHTML = error
    }
  })()
  
  function logout() {
    localStorage.removeItem('access_token');
    location.href = '/login'
  }