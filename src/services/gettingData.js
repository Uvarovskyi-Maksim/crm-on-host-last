const getAllData = async () => {
  try {
    const response = await fetch(`/api/getAllClients`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


const getDataNew = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataAgreed = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataInProcessing = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataInCancel = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataSuccesful = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataReturn = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataNds = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getDataWholesale = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// const getData = async (limit = 10, status='') => {
//   try {
//     // Загружаем по 10 из каждого статуса
//     const newStatusData = await fetchClientsByStatus(limit, 'new');
//     const inProcessingStatusData = await fetchClientsByStatus(limit, 'in_processing');
//     const agreedStatusData = await fetchClientsByStatus(limit, 'agreed');
//     const succesfulStatusData = await fetchClientsByStatus(limit, 'successful');
//     const returnStatusData = await fetchClientsByStatus(limit, 'return');
//     const ndsStatusData = await fetchClientsByStatus(limit, 'nds');
//     const wholesaleStatusData = await fetchClientsByStatus(limit, 'wholesale');
//     const cancelStatusData = await fetchClientsByStatus(limit, 'cancel');

//     const combinedData = [
//       ...newStatusData,
//       ...inProcessingStatusData,
//       ...agreedStatusData,
//       ...succesfulStatusData,
//       ...returnStatusData,
//       ...ndsStatusData,
//       ...wholesaleStatusData,
//       ...cancelStatusData
//       // ... добавьте результаты других статусов, если необходимо
//     ];

//     return combinedData;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };

// const fetchClientsByStatus = async (limit, status) => {
//   try {
//     const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
//     if (response.ok) {
//       return await response.json();
//     } else {
//       console.error(`Failed to fetch users with status ${status}:`, response.statusText);
//       return [];
//     }
//   } catch (error) {
//     console.error(`Error fetching users with status ${status}:`, error);
//     return [];
//   }
// };

const getManagers = async () => {
  try {

    const response = await fetch(`/api/getManagers`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getBuyers = async () => {
  try {

    const response = await fetch(`/api/getBuyers`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getProducts = async () => {
  try {

    const response = await fetch(`/api/getProducts`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getNotices = async () => {
  try {

    const response = await fetch(`/api/getNotices`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
const getCloseClients = async () => {
  try {

    const response = await fetch(`/api/getCloseClients`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getTasks = async () => {
  try {

    const response = await fetch(`/api/getTasks`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
export {getAllData, getDataReturn, getDataWholesale, getDataNds, getDataSuccesful, getDataInCancel, getDataNew, getDataAgreed, getDataInProcessing, getManagers, getBuyers, getProducts, getNotices, getCloseClients, getTasks};
