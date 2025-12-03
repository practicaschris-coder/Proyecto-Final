function cambiarTab(tab) {
      let panelLogin = document.getElementById('panel-login');
      let panelRegistro = document.getElementById('panel-registro');
      let tabLogin = document.getElementById('tab-login');
      let tabRegistro = document.getElementById('tab-registro');
      
      if (tab === 'login') {
        panelLogin.style.display = 'block';
        panelRegistro.style.display = 'none';
        
        tabLogin.style.color = '#667eea';
        tabLogin.style.borderBottom = '3px solid #667eea';
        tabLogin.style.fontWeight = '700';
        
        tabRegistro.style.color = '#999';
        tabRegistro.style.borderBottom = '3px solid transparent';
        tabRegistro.style.fontWeight = '600';
      } else {
        panelLogin.style.display = 'none';
        panelRegistro.style.display = 'block';
        
        tabRegistro.style.color = '#667eea';
        tabRegistro.style.borderBottom = '3px solid #667eea';
        tabRegistro.style.fontWeight = '700';
        
        tabLogin.style.color = '#999';
        tabLogin.style.borderBottom = '3px solid transparent';
        tabLogin.style.fontWeight = '600';
      }
    }
