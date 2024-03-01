// searchFunctions.js

  
  const handleSearch = (event, data, numberPhone, adminKey, setMyClient, setNotMyClient, setAvailability) => {
    // clearing(setNotMyClient, setMyClient, setAvailability, numberPhone);
  
    event.preventDefault();
    const filterData = data.filter((person) => numberPhone === person.phone && person.managerKey === adminKey || numberPhone === person.secondPhone && person.managerKey === adminKey || numberPhone === person.clientName && person.managerKey === adminKey);
    setMyClient(filterData);
    setNotMyClient(data.filter((person) => numberPhone === person.phone && person.managerKey !== adminKey || numberPhone === person.secondPhone && person.managerKey !== adminKey || numberPhone === person.clientName && person.managerKey !== adminKey));
    
   
  };
  
  export default handleSearch;
  