const getRoleLabel = (role: String) => {
    switch (role) {
      case "GlobalAdmin": return 'Глобал Адмін'; break;
      case "DomainAdmin": return 'Продавець'; break;
      case "User": return 'Користувач'; break;
      case undefined: return 'Неавторизований користувач'; break;
      default: ''; break;
    }
  }
  
  export default getRoleLabel