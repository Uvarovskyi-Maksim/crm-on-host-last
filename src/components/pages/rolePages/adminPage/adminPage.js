import { useState, useEffect } from "react";
import { fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice, registerTask, fetchDataByIdTask } from "../../../common/EditData";
import "react-datepicker/dist/react-datepicker.css";
import logout from "../../../common/methods";
import handleSearch from '../../../common/Search'
import Overlay from "./Overlay";
import View from "./View";
import Spinner from "../../../../services/Spinner";
import { EditForm, EditFormBuyer, EditFormProduct, ClientRegistrationForm, EditManagerForm } from "../../../forms/editForm";
import AnalyticsImg from "../../../../img/analytics.png"
import AddUserImg from "../../../../img/addUser.png"
import BuyerImg from "../../../../img/buyer.png"
import LeedImg from "../../../../img/leed.png"
import ListImg from "../../../../img/list.png"
import ProductListImg from "../../../../img/productList.png"
import LeaveImg from "../../../../img/leave.png"
import ClockImg from '../../../../img/clock.png'
import ClientImg from '../../../../img/client.png'
import ManagerImg from '../../../../img/manager.png'
import EditImg from '../../../../img/edit.png'
import './adminPageStyle.css'
import { getDataSuccesful, getDataWholesale, getDataNds, getDataReturn, getDataInProcessing, getDataInCancel, getDataNew, getDataAgreed, getManagers, getBuyers, getProducts, getNotices, getCloseClients, getTasks } from "../../../../services/gettingData";
import StatusChart from './Diagram';
const AdminPage = () => {

  const overlays = [

    'editBuyerMode',
    'editProductMode',
    'editTaskMode',

    'editMode',
  ];
  const storedAdminKey = localStorage.getItem('adminKey');
  const storedUserName = localStorage.getItem('userName')
  const storedUserRole = localStorage.getItem('userRole')
  const storedUser = localStorage.getItem('user')
  const storedManagerKey = localStorage.getItem('managerKey');

  const currentDate = new Date();
  const formattedDateTime = formatDateTime(currentDate);


  const [loadedItems, setLoadedItems] = useState(100);
  const [loadedItemsAgreed, setLoadedItemsAgreed] = useState(100);
  const [loadedItemsInProcessing, setLoadedItemsInProcessing] = useState(100);
  const [loadedItemsCancel, setLoadedItemsCancel] = useState(100);
  const [loadedItemsSuccesful, setLoadedItemsSuccesful] = useState(100);
  const [loadedItemsReturn, setLoadedItemsReturn] = useState(100);
  const [loadedItemsNds, setLoadedItemsNds] = useState(100);
  const [loadedItemsWholesale, setLoadedItemsWholesale] = useState(100);


  const [dataLoaded, setDataLoaded] = useState(false);

  const [statusFilter, setStatusFilter] = useState('new');
  const [statusFilterAgreed, setStatusFilterAgreed] = useState('agreed');
  const [statusFilterInProcessing, setStatusFilterInProcessing] = useState('in_processing')
  const [statusFilterCancel, setStatusFilterCancel] = useState('cancel')
  const [statusFilterSuccesful, setStatusFilterSuccesful] = useState('successful')
  const [statusFilterReturn, setStatusFilterReturn] = useState('return')
  const [statusFilterNds, setStatusFilterNds] = useState('nds')
  const [statusFilterWholesale, setStatusFilterWholesale] = useState('wholesale')




  const [registrationData, setRegistrationData] = useState({
    nameManager: '',
    email: '',
    password: '',
    role: 'manager',
    managerKey: storedAdminKey
  });
  const [registrationDataClient, setRegistrationDataClient] = useState({
    email: '',
    phone: '',
    secondPhone: '',
    role: 'client',
    managerID: storedAdminKey,
    managerKey: storedAdminKey,
    status: 'new',
    product: 'Товары отсутсвуют',
    payment: '',
    selectedDate: '',
    dateOfCreated: `${formattedDateTime}`,
    clientName: ''
  });
  const [registrationDataBuyer, setRegistrationDataBuyer] = useState({
    email: '',
    phone: '',
    name: '',
    notice: '',
    role: 'buyer',
    managerID: '',
    managerKey: storedAdminKey,
  });
  const [registrationDataProduct, setRegistrationDataProduct] = useState({
    name: '',
    cost: '',
    count: '',
  });
  const [registrationDataNotice, setRegistrationDataNotice] = useState({
    noticeID: '',
    content: '',
    noticeDate: '',
  });

  const [registrationDataTask, setRegistrationDataTask] = useState({
    startDate: '',
    endDate: '',
    createdDate: `${formattedDateTime}`,
    managerID: '',
    managerKey: storedAdminKey,
    taskLine: '',
    taskStatus: 'false'
  });

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const [adminKey, setAdminKey] = useState(null);
  const [userName, setUserName] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [users, setUsers] = useState([]);
  const [ManagerStatusOptions, setManagerStatusOptions] = useState([])
  const [managerIDOptions, setManagerIDOptions] = useState([]);
  const [paymentArray, setPaymentArray] = useState([])
  const [formState, setFormState] = useState(false);
  const [filterBlock, setFilterBlock] = useState(false)


  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null)
  const [user, setUser] = useState(null)
  const [dataManagers, setDataManagers] = useState(null)
  const [dataBuyers, setDataBuyers] = useState(null)
  const [dataProducts, setDataProducts] = useState(null)
  const [dataNotices, setDataNotices] = useState(null)
  const [closeClients, setCloseClients] = useState(null)
  const [dataTasks, setDataTasks] = useState(null)
  const [selectTask, setSelectTask] = useState([])


  const [dataManagersID, setDataManagersID] = useState([])
  const [notMyClient, setNotMyClient] = useState([]);
  const [myClient, setMyClient] = useState([]);
  const [numberPhone, setNumber] = useState("");
  const [availability, setAvailability] = useState();
  const [showClients, setShowClients] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [startDateFilterLoad, setStartDateFilterLoad] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [startBlock, setStartBlock] = useState(true)

  const [editMode, setEditMode] = useState(false);
  const [editClientMode, setEditClientMode] = useState(false);
  const [editClientViewMode, setEditClienViewtMode] = useState(false);
  const [addLeedMode, setAddLeedMode] = useState(false)
  const [editTaskMode, setEditTaskMode] = useState(false)

  const [editBuyerMode, setEditBuyerMode] = useState(false);
  const [editProductMode, setEditProductMode] = useState(false);
  const [hasUncompletedTaskToday, setHasUncompletedTaskToday] = useState(false);

  const [registerUserBlock, setRegisterUserBlock] = useState(false)
  const [managersList, setManagersList] = useState(false)
  const [showBuyerBlock, setShowBuyerBlock] = useState(false)
  const [showProductBlock, setShowProductBlock] = useState(false)
  const [showAnalyticBlock, setShowAnalyticBlock] = useState(false)


  useEffect(() => {
    fetchData();
    setAdminKey(storedAdminKey);
    setUserName(storedUserName)
    setUserRole(storedUserRole)
    setUser(storedUser)
  }, [loadedItems, statusFilter, statusFilterAgreed, loadedItemsAgreed, statusFilterInProcessing, loadedItemsInProcessing, statusFilterCancel, loadedItemsCancel, statusFilterSuccesful, loadedItemsSuccesful, statusFilterReturn, loadedItemsReturn, statusFilterNds, loadedItemsNds, statusFilterWholesale, loadedItemsWholesale]);
  // task.selectedDate !== startDateFilterLoad

  // useEffect(() => {

  // }, [data, startDateFilterLoad]);

  useEffect(() => {
    const currenttoDate = new Date().toISOString().split('T')[0];
    setStartDateFilter(currenttoDate);
    setStartDateFilterLoad(currentDate)
    setEndDateFilter(currenttoDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminKey = localStorage.getItem('adminKey');
        const response = await fetch(`/api/usersByAdminKey?adminKey=${adminKey}`);

        if (response.ok) {
          const data = await response.json();
          console.log(adminKey);
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
          console.log('NO');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const managerIDArray = users.map((user) => user);
    setManagerIDOptions(managerIDArray);
  }, [users]);

  useEffect(() => {
    const managerStatusArray = ['new', 'in_processing', 'agreed', 'successful', 'return', 'nds', 'wholesale', 'cancel']
    const paymentArray = ['Не оплатил', 'На карту']
    setPaymentArray(paymentArray)
    setManagerStatusOptions(managerStatusArray)
  }, [])


  const showBlock = (blockName) => {
    setActiveMenuItem(blockName);
    setShowClients(blockName === 'Лиды');
    setRegisterUserBlock(blockName === 'Добавить пользователя');
    setManagersList(blockName === 'Список менеджеров');
    setShowBuyerBlock(blockName === 'Покупатели');
    setShowProductBlock(blockName === 'Продукты');
    setShowAnalyticBlock(blockName === 'Аналитика')
    setStartBlock(false)
  };

  const fetchData = async () => {
    try {
      const responseData1 = await getDataNew(loadedItems, statusFilter);
      const responseDataAgreed = await getDataAgreed(loadedItemsAgreed, statusFilterAgreed);
      const responseDataInProcessing = await getDataInProcessing(loadedItemsInProcessing, statusFilterInProcessing);
      const responseDataCancel = await getDataInCancel(loadedItemsCancel, statusFilterCancel);
      const responseDataSuccesful = await getDataSuccesful(loadedItemsSuccesful, statusFilterSuccesful);
      const responseReturn = await getDataReturn(loadedItemsReturn, statusFilterReturn);
      const responseDataNds = await getDataNds(loadedItemsNds, statusFilterNds);
      const responseWholesale = await getDataWholesale(loadedItemsWholesale, statusFilterWholesale);


      const responseManagers = await getManagers();
      const responseBuyers = await getBuyers();
      const responseProducts = await getProducts();
      const responseNotices = await getNotices();
      const responseCloseClients = await getCloseClients();
      const responseTasks = await getTasks();

      if (
        Array.isArray(responseData1) &&
        responseManagers &&
        responseBuyers &&
        responseProducts &&
        responseNotices &&
        responseCloseClients &&
        responseTasks
      ) {
        setData((prevData) => {
          const responseData = [...responseData1, ...responseDataAgreed, ...responseDataInProcessing, ...responseDataCancel, ...responseDataSuccesful, ...responseReturn, ...responseDataNds, ...responseWholesale]

          setAllData(responseData)
          const existingData = Array.isArray(prevData) ? prevData : [];
          const uniqueData = responseData.filter((newItem) => !existingData.some((item) => item._id === newItem._id));

          const combinedData = [...existingData, ...uniqueData];

          const uncompletedTaskToday = combinedData.filter((task) => {
            const taskDate = new Date(task.selectedDate);
            const formattedDate = new Date(formattedDateTime);

            return taskDate < formattedDate;
          });

          setHasUncompletedTaskToday(uncompletedTaskToday);

          return combinedData;
        });

        setDataManagers(responseManagers);
        setDataBuyers(responseBuyers);
        setDataProducts(responseProducts);
        setDataNotices(responseNotices);
        setCloseClients(responseCloseClients);
        setDataTasks(responseTasks)

        setDataLoaded(true);
      } else {
        console.error('Some data failed to load');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleDeleteClient = async () => {
    const id = {
      _id: selectedClient._id
    }
    await handleDeleteData('/api/deleteClient', id, fetchData);
  };

  const handleDeleteBuyer = async () => {
    const id = {
      _id: selectedBuyer._id
    }
    await handleDeleteData('/api/deleteBuyer', id, fetchData);
  };

  const handleDeleteProduct = async () => {
    const id = {
      _id: selectedProduct._id
    }
    await handleDeleteData('/api/deleteProduct', id, fetchData);
  };

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearchWrapper = (event) => {
    clearing()
    handleSearch(event, allData, numberPhone, adminKey, setMyClient, setNotMyClient, setAvailability);
  };


  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationClientChange = (e) => {
    setRegistrationDataClient({
      ...registrationDataClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationBuyerChange = (e) => {
    setRegistrationDataBuyer({
      ...registrationDataBuyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationProductChange = (e) => {
    setRegistrationDataProduct({
      ...registrationDataProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationNoticeChange = (e) => {
    setRegistrationDataNotice({
      ...registrationDataNotice,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationTaskChange = (e) => {
    setRegistrationDataTask({
      ...registrationDataTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async () => {
    await registerManager(registrationData, fetchData);
  };

  const handleRegistrationClient = async () => {
    await registerClient(registrationDataClient, fetchData);
  };

  const handleRegistrationBuyer = async () => {
    await registerBuyer(registrationDataBuyer, fetchData);
  };

  const handleRegistrationProduct = async () => {
    await registerProduct(registrationDataProduct, fetchData);
  };

  const handleRegistrationTask = async () => {
    await registerTask(registrationDataTask, fetchData);
  };

  const reset = () => {
    setRegistrationDataNotice({})
  }

  const handleRegistrationNotice = async () => {
    await registerNotice(registrationDataNotice, fetchData);
    await console.log(registrationDataNotice)
  };

  const handleManagerClick = async (id) => {
    fetchDataById(id, '/api/getManagerData', setSelectedManager, setEditMode, setRegistrationDataNotice);
  };

  const handleViewTask = async (id) => {
    try {
      await fetchDataByIdTask(id, '/api/getManagerData', setSelectedManager, toggleTaskMode, dataTasks, setSelectTask);

    } catch (error) {
      console.error('Произошла ошибка при выполнении fetchDataById:', error);
    }
  };


  const handleClientClick = async (id) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setEditClientMode, setRegistrationDataNotice);
  };
  const handleClientDoubleClick = async (id) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setEditClienViewtMode, setRegistrationDataNotice);

  };
  const handleBuyerClick = async (id) => {
    fetchDataById(id, '/api/getBuyerData', setSelectedBuyer, setEditBuyerMode, setRegistrationDataNotice);
  };

  const handleProductClick = async (id) => {
    fetchDataById(id, '/api/getProductData', setSelectedProduct, setEditProductMode, setRegistrationDataNotice);
  };
  const handleEditManager = async () => {
    const requestData = {
      _id: selectedManager._id,
      email: selectedManager.email,
      password: selectedManager.password,
    };

    await handleEditData('/api/updateManagerData', requestData, setEditMode, fetchData);
  };

  const handleEditClient = async () => {
    const requestData = {
      _id: selectedClient._id,
      email: selectedClient.email,
      phone: selectedClient.phone,
      managerID: selectedClient.managerID,
      status: selectedClient.status,
      product: selectedClient.product,
      clientName: selectedClient.clientName,
      payment: selectedClient.payment,
      selectedDate: selectedClient.selectedDate,
      secondPhone: selectedClient.secondPhone
    };

    await handleEditData('/api/updateClientData', requestData, setEditMode, fetchData);
  };
  const handleEditBuyer = async () => {
    const requestData = {
      _id: selectedBuyer._id,
      email: selectedBuyer.email,
      phone: selectedBuyer.phone,
      managerID: selectedBuyer.managerID,
      name: selectedBuyer.name,
      notice: selectedBuyer.notice
    };

    await handleEditData('/api/updateBuyerData', requestData, setEditMode, fetchData);
  };

  const handleEditProduct = async () => {
    const requestData = {
      _id: selectedProduct._id,
      name: selectedProduct.name,
      cost: selectedProduct.cost,
      count: selectedProduct.count,
    };

    await handleEditData('/api/updateProductData', requestData, setEditMode, fetchData);
  };
  const clearing = () => {
    setNotMyClient([]);
    setMyClient([]);
    setAvailability("");
    setNumber("");
  };
  const handleDateChange = (date) => {
    console.log("Received date:", date);

    if (typeof date === 'string') {
      // Преобразование строки в объект Date
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date)) {
      const offset = new Date().getTimezoneOffset();
      const correctedDate = new Date(date.getTime() - offset * 60 * 1000);

      console.log("Corrected date:", correctedDate);

      setRegistrationDataClient((prevData) => ({
        ...prevData,
        selectedDate: correctedDate,
      }));
    } else {
      console.error("Invalid date object:", date);
      // Можно предпринять какие-то дополнительные действия в случае недопустимой даты
    }
  };
  const toggleTaskMode = () => {
    setEditTaskMode(true);
  };

  const close = () => {
    setEditClientMode(false)
    setEditBuyerMode(false)
    setEditProductMode(false)
    setEditClienViewtMode(false)
    setAddLeedMode(false)
    setEditMode(false)
    setEditTaskMode(false)
  }

  const addLeed = () => {
    setAddLeedMode(true)
  }


  const handleStartDateChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateChange = (date) => {
    setEndDateFilter(date);
  };
  const sortByDate = (data) => {
    return data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  const openFilter = () => {
    setFilterBlock(true)
  }

  const closeFilter = () => {
    setFilterBlock(false)
  }

  return (
    <div className="main">
      {dataLoaded ? (
        <>
          {overlays.map((mode, index) => (
            <Overlay key={index} mode={eval(mode)} close={close} />
          ))}




          <div className="left_menu">
            <div className="manager_name_block">
              <div className="name">
                {userName}
              </div>
              <div className="role">
                {userRole}
              </div>
              <img onClick={logout} className="logout" src={LeaveImg} alt="" />
            </div>
            <div className="menu_block">
              <div
                className={`menu_element ${activeMenuItem === 'Лиды' ? 'active_el' : ''} `}
                onClick={() => showBlock('Лиды')}
              >

                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={LeedImg} alt="" /> <div className="menu_text">Лиды</div>

              </div>
              <div
                className={`menu_element ${activeMenuItem === 'Список менеджеров' ? 'active_el' : ''}`}
                onClick={() => showBlock('Список менеджеров')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={ListImg} alt="" /> <div className="menu_text">Список менеджеров</div>


              </div>
              {/* <div
                className={`menu_element ${activeMenuItem === 'Добавить пользователя' ? 'active_el' : ''}`}
                onClick={() => showBlock('Добавить пользователя')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={AddUserImg} alt="" /> <div className="menu_text">Добавить пользователя</div>
              </div> */}
              <div
                className={`menu_element ${activeMenuItem === 'Покупатели' ? 'active_el' : ''}`}
                onClick={() => showBlock('Покупатели')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={BuyerImg} alt="" /> <div className="menu_text">Покупатели</div>
              </div>
              <div
                className={`menu_element ${activeMenuItem === 'Продукты' ? 'active_el' : ''}`}
                onClick={() => showBlock('Продукты')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={ProductListImg} alt="" /> <div className="menu_text">Продукты</div>
              </div>
              <div
                className={`menu_element ${activeMenuItem === 'Аналитика' ? 'active_el' : ''}`}
                onClick={() => showBlock('Аналитика')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={AnalyticsImg} alt="" /> <div className="menu_text">Аналитика</div>
              </div>
            </div>
          </div>

          <div className="right_content">
            {startBlock && <>
              <div className="hello">Добро Пожаловать, {user}!</div>
            </>}
            {registerUserBlock &&
              <div style={{ marginLeft: "1.5%" }}>
                <h1>Добавить пользователя</h1>

                <form>
                  <table className="reg_table">
                    <tbody>
                      <tr>
                        <td className="input_td"><div>Name:</div><input type="text" name="nameManager" value={registrationData.nameManager} onChange={handleRegistrationChange} required /></td>

                        <td className="input_td"><div>Email:</div><input type="email" name="email" value={registrationData.email} onChange={handleRegistrationChange} required /></td>
                        <td className="input_td"><div>Password:</div><input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} required /></td>
                        <td className="input_td"><div>Role:</div><select name="role" value={registrationData.role} onChange={handleRegistrationChange}>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                        </td>

                      </tr>
                    </tbody>
                    <button className="register btn_buyer" type="button" onClick={handleRegistration}>Register</button>
                  </table>



                </form>

              </div>

            }
            <div>

              <div>
                {showClients && <div className="show_clients_block">
                  <div className="clients_block">
                  
                    <form className="search_form" action="">
                      <div className="search">
                        <input className="search_input" type="text" value={numberPhone} onChange={handleInputChange} />
                        <button className="search_btn" onClick={handleSearchWrapper}>Найти</button>


                        <button className="search_reset" type="button" onClick={clearing}>&times;</button>
                      </div>


                      <div className="add_leed" onClick={addLeed}>Добавить Лид</div>

                    </form>
                    <div className="register" onClick={openFilter}>Открыть фильтры</div>

                    <ul className="search_leed_result">
                      {myClient.map((client) => (
                        <li
                          className="statusColsElement"
                          key={client._id}
                          onDoubleClick={() => handleClientDoubleClick(client._id)}
                        >
                          <div className="managers_name_block">
                            <img className="clock_img" src={ManagerImg} alt="" />
                            {dataManagers.map(el => {
                              if (el.managerID === client.managerID) {
                                return <div>{el.nameManager}</div>
                              }
                            })}
                          </div>
                          <div className={`date_name_block ${hasUncompletedTaskToday.some(el => el.email === client.email) ? 'uncompleted_tasks' : ''}`}>
                            <img className={`clock_img `} src={ClockImg} alt="" />
                            {formatDateTime(new Date(client.selectedDate))}
                          </div>
                          <div className="client_name_block">
                            <img className="clock_img" src={ClientImg} alt="" />
                            {client.clientName}
                          </div>
                          <div className="date_name_block" style={{ position: "absolute", bottom: "0", right: "0", color: "rgb(170 170 170)", backgroundColor: "#fff" }}>
                            {client.dateOfCreated}
                          </div>
                          <div style={{ width: "max-content", textAlign: "center", position: "absolute", top: "0", right: "0", cursor: "pointer" }} onClick={() => handleClientClick(client._id)}>
                            <img className="clock_img" src={EditImg} alt="" />
                          </div>
                        </li>
                      ))}
                      {notMyClient.map((person) => (
                       
                        <table style={{marginTop:"30px"}}>
                          <tr>
                            <th>Email менеджера</th>
                            <th>Имя менеджера</th>
                            <th>Имя клиента</th>
                          </tr>
                          <tr>
                            <td style={{width:"50%"}}>{dataManagers.find(el => el.managerID === person.managerID)?.email}</td>
                            <td>{dataManagers.find(el => el.managerID === person.managerID)?.nameManager}</td>
                            <td>{person.clientName}</td>
                          </tr>
                        </table>
                      ))}
                      {availability}
                    </ul>


                    <View setLoadedItemsCancel={setLoadedItemsCancel} setStatusFilterCancel={setStatusFilterCancel} setLoadedItemsWholesale={setLoadedItemsWholesale} setStatusFilterWholesale={setStatusFilterWholesale} setLoadedItemsNds={setLoadedItemsNds} setStatusFilterNds={setStatusFilterNds} setStatusFilterReturn={setStatusFilterReturn} setLoadedItemsReturn={setLoadedItemsReturn} setStatusFilterSuccesful={setStatusFilterSuccesful} setLoadedItemsSuccesful={setLoadedItemsSuccesful} setStatusFilterAgreed={setStatusFilterAgreed} setLoadedItemsAgreed={setLoadedItemsAgreed} setStatusFilterInProcessing={setStatusFilterInProcessing} setLoadedItemsInProcessing={setLoadedItemsInProcessing} setStatusFilter={setStatusFilter} setLoadedItems={setLoadedItems} closeFilter={closeFilter} filterBlock={filterBlock} dataManagers={dataManagers} hasUncompletedTaskToday={hasUncompletedTaskToday} handleDateChange={handleDateChange} paymentArray={paymentArray} data={data} dataNotices={dataNotices} handleRegistrationNoticeChange={handleRegistrationNoticeChange} registrationDataNotice={registrationDataNotice} handleRegistrationNotice={handleRegistrationNotice} handleDeleteClient={handleDeleteClient} handleClientDoubleClick={handleClientDoubleClick} handleClientClick={handleClientClick} editClientViewMode={editClientViewMode} editClientMode={editClientMode} handleEditClient={handleEditClient} setSelectedClient={setSelectedClient} selectedClient={selectedClient} keyManage={adminKey} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} close={close} />
                  </div>

                  <ClientRegistrationForm setRegistrationDataClient={setRegistrationDataClient} handleRegistrationClient={handleRegistrationClient} paymentArray={paymentArray} dataProducts={dataProducts} dataBuyers={dataBuyers} handleDateChange={handleDateChange} handleRegistrationClientChange={handleRegistrationClientChange} addLeedMode={addLeedMode} adminKey={adminKey} close={close} registrationDataClient={registrationDataClient} />

                </div>
                }
                {showAnalyticBlock && <div>
                  <h1>Status Chart</h1>
                  <StatusChart data={closeClients} />
                </div>
                }
              </div>

            </div>
            <div>
              {showBuyerBlock &&
                <div style={{ marginLeft: "1.5%" }}>
                  <form>
                    <h1>Покупатели</h1>
                    <table className="reg_table">
                      <tbody>

                        <tr>
                          <td className="input_td"><div>Name:</div><input type="text" name="name" value={registrationDataBuyer.name} onChange={handleRegistrationBuyerChange} required /></td>

                          <td className="input_td"><div>Email:</div><input type="email" name="email" value={registrationDataBuyer.email} onChange={handleRegistrationBuyerChange} required /></td>
                          <td className="input_td"><div>Phone:</div><input type="phone" name="phone" value={registrationDataBuyer.phone} onChange={handleRegistrationBuyerChange} required /></td>
                          <td className="input_td"><div>Notice:</div><input type="text" name="notice" value={registrationDataBuyer.notice} onChange={handleRegistrationBuyerChange} required /></td>
                          <td className="input_td">
                            <div>Manager:</div>
                            <select name="managerID" value={registrationDataBuyer.managerID} onChange={handleRegistrationBuyerChange} required>
                              {dataManagers.map((option) => (
                                <option key={option.managerID} value={option.managerID}>
                                  {option.email}
                                </option>
                              ))}
                            </select>

                          </td>

                        </tr>
                        <button className="register btn_buyer" type="button" onClick={handleRegistrationBuyer}>Register</button>

                      </tbody>
                    </table>


                  </form>

                  <table className="table_list" border="1" style={{ cursor: "pointer" }}>
                    <thead>
                      <tr>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Номер телефона</th>
                        <th>Заметка</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataBuyers.map((option) => (
                        <tr key={option._id} >
                          <td>{option.name}</td>
                          <td>{option.email}</td>
                          <td>{option.phone}</td>
                          <td>{option.notice}</td>
                          <td className="manager_el_btns">
                            <div className="register edit_buyer_btn" onClick={() => handleBuyerClick(option._id)}>Редактировать</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <EditFormBuyer handleDeleteClient={handleDeleteBuyer} editClientMode={editBuyerMode} setSelectedClient={setSelectedBuyer} handleEditClient={handleEditBuyer} selectedClient={selectedBuyer} managerIDOptions={dataBuyers} ManagerStatusOptions={ManagerStatusOptions} close={close} />

                </div>
              }
            </div>
            {managersList && <div style={{ marginLeft: "1.5%" }}>
              <h1>Добавить пользователя</h1>

              <form>
                <table className="reg_table">
                  <tbody>
                    <tr>
                      <td className="input_td"><div>Name:</div><input type="text" name="nameManager" value={registrationData.nameManager} onChange={handleRegistrationChange} required /></td>

                      <td className="input_td"><div>Email:</div><input type="email" name="email" value={registrationData.email} onChange={handleRegistrationChange} required /></td>
                      <td className="input_td"><div>Password:</div><input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} required /></td>
                      <td className="input_td"><div>Role:</div><select name="role" value={registrationData.role} onChange={handleRegistrationChange}>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                      </td>

                    </tr>
                  </tbody>
                  <button className="register btn_buyer" type="button" onClick={handleRegistration}>Register</button>
                </table>



              </form>
              <h2>Список менеджеров</h2>

              <table border="1" style={{ cursor: "pointer" }}>
                <thead>
                  <tr>
                    <th>Почта</th>
                    <th>Роль</th>
                    <th>Имя</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((option) => (
                    <tr className="manager_el" key={option._id} >
                      <td>{option.email}</td>
                      <td>{option.role}</td>
                      <td>{option.nameManager}</td>
                      <td className="manager_el_btns">
                        <div className="register edit_man_btn" onClick={() => handleManagerClick(option._id)}>Редактировать</div>
                        <div className="register list_task_btn" onClick={() => handleViewTask(option._id)}>Список задач</div>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>


              <EditManagerForm close={close} setSelectedManager={setSelectedManager} editMode={editMode} selectedManager={selectedManager} handleEditManager={handleEditManager} registrationDataTask={registrationDataTask} handleRegistrationTaskChange={handleRegistrationTaskChange} handleRegistrationTask={handleRegistrationTask} />

              <table style={{ marginTop: "40px" }}>
                <tbody>

                  {editTaskMode && <>
                    <div style={{ display: "block" }} className={`user_modal ${editTaskMode ? "show" : ""}`}>
                      <div className="close" onClick={close}>
                        &times;
                      </div>

                      <h3 className="list_task_head">Список Задач</h3>
                      <h4 className="list_task_head">Менеджер: {selectedManager.nameManager}</h4>
                      <div className="period">Период:</div>
                      <div style={{ marginBottom: "50px" }} className="period_inputs period_inputs_date">
                        <input type="date" value={startDateFilter} onChange={(e) => handleStartDateChange(e.target.value)} />
                        <input type="date" value={endDateFilter} onChange={(e) => handleEndDateChange(e.target.value)} />
                      </div>
                      <table>
                        {sortByDate(selectTask)
                          .filter(el => {
                            if (startDateFilter && endDateFilter) {
                              const taskDate = new Date(el.startDate);
                              return taskDate >= new Date(startDateFilter) && taskDate <= new Date(endDateFilter);
                            }
                            return true; // Показывать все задачи, если промежуток не выбран
                          })
                          .map(el => (
                            <tr key={el.id}>
                              <td>{el.taskLine}</td>
                              <td>{el.startDate}</td>
                              <td>{el.endDate}</td>
                              <td>{el.taskStatus === 'true' ? 'Выполнено' : 'Не выполнено'}</td>
                            </tr>
                          ))}
                      </table>

                    </div>
                  </>}

                </tbody>
              </table>
            </div>

            }
            {showProductBlock &&
              <div style={{ marginLeft: "1.5%" }}>
                <h1>Продукты</h1>
                <form>
                  <table className="reg_table">
                    <tbody>

                      <tr>
                        <td className="input_td"><div>Название:</div><input type="text" name="name" value={registrationDataProduct.name} onChange={handleRegistrationProductChange} required /></td>
                        <td className="input_td"><div>Цена:</div><input type="number" name="cost" value={registrationDataProduct.cost} onChange={handleRegistrationProductChange} required /></td>
                        <td className="input_td"><div>Количество:</div><input type="number" name="count" value={registrationDataProduct.count} onChange={handleRegistrationProductChange} required /></td>
                      </tr>
                    </tbody>
                    <button className="register btn_buyer" type="button" onClick={handleRegistrationProduct}>Register</button>

                  </table>

                </form>
                <table className="table_list" border="1" style={{ cursor: "pointer" }}>
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Стоимость</th>
                      <th>Количество</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataProducts.map((option) => (
                      <tr key={option._id} >
                        <td>{option.name}</td>
                        <td>{option.cost}</td>
                        <td>{option.count}</td>
                        <td className="manager_el_btns">
                          <div className="register edit_buyer_btn" onClick={() => handleProductClick(option._id)}>Редактировать</div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>

                <EditFormProduct handleDeleteClient={handleDeleteProduct} editClientMode={editProductMode} setSelectedClient={setSelectedProduct} handleEditClient={handleEditProduct} selectedClient={selectedProduct} close={close} />

              </div>
            }

          </div>
        </>
      ) : (
        <Spinner />

      )}


    </div>
  );
}


export default AdminPage