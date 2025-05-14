const getRoleTagColor = (role: String) => {
  switch (role) {
    case "GlobalAdmin": return 'volcano'; break;
    case "DomainAdmin": return 'purple'; break;
    case "User": return 'blue'; break;
    case undefined: return 'blue'; break;
    default: ''; break;
  }
}

export default getRoleTagColor