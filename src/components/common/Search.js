// searchFunctions.js

  
  const handleSearch = (event, data, numberPhone, adminKey, setMyClient, setNotMyClient, setAvailability, setNotFind) => {
    // clearing(setNotMyClient, setMyClient, setAvailability, numberPhone);
  
    event.preventDefault();
    const filterData = data.filter((person) => numberPhone === person.phone && person.managerKey === adminKey || numberPhone === person.secondPhone && person.managerKey === adminKey || numberPhone === person.clientName && person.managerKey === adminKey);
    setMyClient(filterData);
    const notMyClient = data.filter((person) => numberPhone === person.phone && person.managerKey !== adminKey || numberPhone === person.secondPhone && person.managerKey !== adminKey || numberPhone === person.clientName && person.managerKey !== adminKey)
    setNotMyClient(notMyClient);
    if(filterData.length == 0 && notMyClient.length == 0){
      setNotFind(true)
    }
   
  };
  
  export default handleSearch;
  