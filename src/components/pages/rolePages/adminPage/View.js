import React, { useState, useEffect, useRef } from "react";
import { EditForm, LeedInfo } from "../../../forms/editForm";
import ClockImg from '../../../../img/clock.png'
import ClientImg from '../../../../img/client.png'
import ManagerImg from '../../../../img/manager.png'
import EditImg from '../../../../img/edit.png'
import { formatDateTime } from "../../../common/EditData";


const View = ({
  data,
  keyManage,
  handleClientClick,
  editClientMode,
  setSelectedClient,
  selectedClient,
  handleEditClient,
  managerIDOptions,
  ManagerStatusOptions,
  registrationDataClient,
  handleRegistrationClientChange,
  dataProducts,
  handleClientDoubleClick,
  editClientViewMode,
  handleDeleteClient,
  handleRegistrationNotice,
  registrationDataNotice,
  handleRegistrationNoticeChange,
  dataNotices,
  paymentArray,
  handleDateChange,
  hasUncompletedTaskToday,
  dataManagers,
  close,

  setStatusFilter,
  setLoadedItems,
  setStatusFilterInProcessing,
  setLoadedItemsInProcessing,
  setStatusFilterAgreed,
  setLoadedItemsAgreed,
  setStatusFilterSuccesful,
  setLoadedItemsSuccesful,
  setStatusFilterReturn,
  setLoadedItemsReturn,
  setStatusFilterNds,
  setLoadedItemsNds,
  setStatusFilterWholesale,
  setLoadedItemsWholesale,
  setStatusFilterCancel,
  setLoadedItemsCancel,
  filterBlock,
  closeFilter
}) => {
  const myData = data.filter((person) => keyManage === person.managerKey || keyManage === person.managerID);

  const [visibleItemsNew, setVisibleItemsNew] = useState(5);
  const [visibleItemsInProcessing, setVisibleItemsInProcessing] = useState(5);
  const [visibleItemsAgreed, setVisibleItemsAgreed] = useState(5);
  const [visibleItemsSuccessful, setVisibleItemsSuccessful] = useState(5);
  const [visibleItemsReturn, setVisibleItemsReturn] = useState(5);
  const [visibleItemsNds, setVisibleItemsNds] = useState(5);
  const [visibleItemsWholesale, setVisibleItemsWholesale] = useState(5);
  const [visibleItemsCancel, setVisibleItemsCancel] = useState(100);
  const [reversed, setReversed] = useState(false);


  const [sortActivated, setSortActivated] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState({ 1: false, 2: false, 3: false, 4: false })

  const [showCancelStatus, setShowCancelStatus] = useState(false);

  const newStatusColsRef = useRef(null);
  const inProcessingStatusColsRef = useRef(null);
  const agreedStatusColsRef = useRef(null)
  const succesfulStatusColsRef = useRef(null)
  const returnStatusColsRef = useRef(null)
  const ndsStatusColsRef = useRef(null)
  const wholesaleStatusColsRef = useRef(null)
  const cancelStatusColsRef = useRef(null)


  const filteredData = () => {
    let filtered = sortActivated ? sortedData : myData;

    if (startDate && endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.dateOfCreated) >= new Date(startDate) &&
          new Date(item.dateOfCreated) <= new Date(endDate)
      );
    }

    return filtered;
  };

  const status = (statusType) => {
    return filteredData().filter((person) => statusType === person.status);
  };

  const handleScroll = (ref, setVisibleItems) => {
    const element = ref.current;
    if (element.scrollHeight - element.scrollTop < 1.3 * element.clientHeight) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    }
  };

  useEffect(() => {
    const newStatusElement = newStatusColsRef.current;
    const inProcessingStatusElement = inProcessingStatusColsRef.current;
    const agreedStatusElement = agreedStatusColsRef.current;
    const successfulStatusElement = succesfulStatusColsRef.current;
    const returnStatusElement = returnStatusColsRef.current;
    const ndsStatusElement = ndsStatusColsRef.current;
    const wholesaleStatusElement = wholesaleStatusColsRef.current;
    const cancelStatusElement = cancelStatusColsRef.current;


    newStatusElement.addEventListener("scroll", () => handleScroll(newStatusColsRef, setVisibleItemsNew));
    inProcessingStatusElement.addEventListener("scroll", () => handleScroll(inProcessingStatusColsRef, setVisibleItemsInProcessing));
    agreedStatusElement.addEventListener("scroll", () => handleScroll(agreedStatusColsRef, setVisibleItemsAgreed));
    successfulStatusElement.addEventListener("scroll", () => handleScroll(succesfulStatusColsRef, setVisibleItemsSuccessful));
    returnStatusElement.addEventListener("scroll", () => handleScroll(returnStatusColsRef, setVisibleItemsReturn));
    ndsStatusElement.addEventListener("scroll", () => handleScroll(ndsStatusColsRef, setVisibleItemsNds));
    wholesaleStatusElement.addEventListener("scroll", () => handleScroll(wholesaleStatusColsRef, setVisibleItemsWholesale));
    // cancelStatusElement.addEventListener("scroll", () => handleScroll(cancelStatusColsRef, setVisibleItemsCancel));
    return () => {
      newStatusElement.removeEventListener("scroll", () => handleScroll(newStatusColsRef, setVisibleItemsNew));
      inProcessingStatusElement.removeEventListener("scroll", () => handleScroll(inProcessingStatusColsRef, setVisibleItemsInProcessing));
      agreedStatusElement.removeEventListener("scroll", () => handleScroll(agreedStatusColsRef, setVisibleItemsAgreed));
      successfulStatusElement.removeEventListener("scroll", () => handleScroll(succesfulStatusColsRef, setVisibleItemsSuccessful));
      returnStatusElement.removeEventListener("scroll", () => handleScroll(returnStatusColsRef, setVisibleItemsReturn));
      ndsStatusElement.removeEventListener("scroll", () => handleScroll(ndsStatusColsRef, setVisibleItemsNds));
      wholesaleStatusElement.removeEventListener("scroll", () => handleScroll(wholesaleStatusColsRef, setVisibleItemsWholesale));
      // cancelStatusElement.removeEventListener("scroll", () => handleScroll(cancelStatusColsRef, setVisibleItemsCancel));

    };
  }, [setVisibleItemsNew, setVisibleItemsInProcessing, setVisibleItemsAgreed, setVisibleItemsCancel]);

  const renderStatusElements = (statusType, ref, visibleItems) => {
    return status(statusType)
      .slice(0, visibleItems)
      .map((client) => (
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
      ));
  };


  const sortDate = () => {
    const sorted = filteredData().slice().sort((a, b) => {
      const firstDate = new Date(a.dateOfCreated);
      const secondDate = new Date(b.dateOfCreated);
      return firstDate - secondDate;
    });
    setSortedData(sorted);
    setSortActivated(true);
    setActiveMenuItem({ 1: true, 2: false, 3: false, 4: false })
    console.log(activeMenuItem)
  };
  const sortDatePhone = () => {
    const sorted = filteredData().slice().sort((a, b) => {
      const firstDate = new Date(a.selectedDate);
      const secondDate = new Date(b.selectedDate);
      return firstDate - secondDate;
    });
    setSortedData(sorted);
    setSortActivated(true);
    setActiveMenuItem({ 1: false, 2: true, 3: false, 4: false })
    console.log(activeMenuItem)
  };
  const sortByEmail = () => {
    const sorted = myData.slice().sort((a, b) => {
      const firstName = a.email.toLowerCase();
      const secondName = b.email.toLowerCase();
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    });
    setSortedData(sorted);
    setSortActivated(true);
    setActiveMenuItem({ 1: false, 2: false, 3: true, 4: false })
    console.log(activeMenuItem)
  };
  const sortByName = () => {
    const sorted = myData.slice().sort((a, b) => {
      const firstName = a.clientName.toLowerCase();
      const secondName = b.clientName.toLowerCase();
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    });
    setSortedData(sorted);
    setSortActivated(true);
    setActiveMenuItem({ 1: false, 2: false, 3: false, 4: true })
    console.log(activeMenuItem)
  };

  const cancelSort = () => {
    setSortActivated(false);
    setSortedData([]);
    setStartDate(null)
    setEndDate(null)
    setActiveMenuItem(false)
  };

  const reverseData = (dataArray) => {
    return dataArray.slice().reverse();
  };

  const handleReverseData = () => {
    setSortActivated(true);
  
    if (reversed) {
      setSortedData(sortedData.length == 0 ? data : sortedData);
      setReversed(false);
    } else {
      // Переворачиваем данные в зависимости от их текущего состояния
      const newData = sortedData.length > 0 ? reverseData(sortedData) : reverseData(data);
      setSortedData(newData);
      setReversed(true);
    }
  };
  
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleLoadMoreWithStatusFilter = (status, state, count) => {
    cancelSort()
    state(status);
    count(prev => prev + 10);
    console.log(data)
  };

  return (
    <div>
      <div className="sort_block">
        <div className="close" onClick={closeFilter}>
          &times;
        </div>
        <div className="period_search">

          <div className="sort_head_txt">Период:</div>
          <div className="period_inputs">
            <input className="date" type="date" onChange={handleStartDateChange} />
            <input className="date" type="date" placeholder="" onChange={handleEndDateChange} />
          </div>
        </div>
        <div className="period_search">
          <div className="sort_head_txt">Сортировка:</div>
          <div className="filter_btns" >
            <div style={{ marginLeft: "0" }} className={`filter_btn ${activeMenuItem[1] === true ? 'active_el' : ''}`} onClick={sortDate}>По Дате</div>
            <div className={`filter_btn ${activeMenuItem[2] === true ? 'active_el' : ''}`} onClick={sortDatePhone}>По Дате созвона</div>
            <div className={`filter_btn ${activeMenuItem[3] === true ? 'active_el' : ''}`} onClick={sortByEmail}>По Email</div>
            <div className={`filter_btn ${activeMenuItem[4] === true ? 'active_el' : ''}`} onClick={sortByName}>По Имени</div>
            <div className="filter_btn" onClick={cancelSort}>Отменить сортировку</div>
            <div className="filter_btn" onClick={handleReverseData}>Повернуть</div>

          </div>
        </div>
        {/* <div onClick={()=>sortedData.reverse()}> Перевернуть</div> */}
        <div>
          <div className="sort_head_txt">Отменённые:</div>
          <div className="cancel_block">

            <div style={{ paddingLeft: "0" }} className={`cancel_txt ${showCancelStatus == false ? 'active_el_hide' : ''}`}>Скрыть</div>
            <div className="cancel_checkbox">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={showCancelStatus}
                  onChange={() => setShowCancelStatus(!showCancelStatus)}
                />
                <span className="slider"></span>

              </label>
            </div>
            <div className={`cancel_txt ${showCancelStatus == true ? 'active_el_hide' : ''}`}>Показать</div>
          </div>
        </div>

      </div>
      <div className="statusBlock">
        <ul className="statusCols" ref={newStatusColsRef}>
          <div className="status_name"><h4>Потенциальный</h4></div>
          <div className="status_els">
            {renderStatusElements("new", newStatusColsRef, visibleItemsNew)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('new', setStatusFilter, setLoadedItems)}>Загрузить ещё</div>

          </div>

        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>

          <div className="status_name">
            <h4>Я подумаю, наберать систематично</h4>
          </div>
          <div className="status_els">
            {renderStatusElements("in_processing", inProcessingStatusColsRef, visibleItemsInProcessing)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('in_processing', setStatusFilterInProcessing, setLoadedItemsInProcessing)}>Загрузить ещё</div>

          </div>
        </ul>
        <ul className="statusCols" ref={agreedStatusColsRef}>
          <div className="status_name">
            <h4>Договорились, но не отгрузили</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("agreed", agreedStatusColsRef, visibleItemsAgreed)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('agreed', setStatusFilterAgreed, setLoadedItemsAgreed)}>Загрузить ещё</div>

          </div>
        </ul>
        <ul className="statusCols" ref={succesfulStatusColsRef}>
          <div className="status_name">
            <h4>Успешный</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("successful", succesfulStatusColsRef, visibleItemsSuccessful)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('successful', setStatusFilterSuccesful, setLoadedItemsSuccesful)}>Загрузить ещё</div>

          </div>
        </ul>
        <ul className="statusCols" ref={returnStatusColsRef}>
          <div className="status_name">
            <h4>Клиент купил на стороне. Вернуть!</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("return", returnStatusColsRef, visibleItemsReturn)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('return', setStatusFilterReturn, setLoadedItemsReturn)}>Загрузить ещё</div>

          </div>
        </ul>
        <ul className="statusCols" ref={ndsStatusColsRef}>
          <div className="status_name">
            <h4>НДС</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("nds", ndsStatusColsRef, visibleItemsNds)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('nds', setStatusFilterNds, setLoadedItemsNds)}>Загрузить ещё</div>

          </div>
        </ul>
        <ul className="statusCols" ref={wholesaleStatusColsRef}>
          <div className="status_name">
            <h4>Опт</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("wholesale", wholesaleStatusColsRef, visibleItemsWholesale)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('wholesale', setStatusFilterWholesale, setLoadedItemsWholesale)}>Загрузить ещё</div>

          </div>
        </ul>
        {showCancelStatus && <ul className="statusCols cancel" ref={cancelStatusColsRef}>
          <div className="status_name">
            <h4>Отменённые</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("cancel", cancelStatusColsRef, visibleItemsCancel)}
            <div className="upload_el" onClick={() => handleLoadMoreWithStatusFilter('cancel', setStatusFilterCancel, setLoadedItemsCancel)}>Загрузить ещё</div>

          </div>
        </ul>}
      </div>

      <EditForm handleDateChange={handleDateChange} paymentArray={paymentArray} handleDeleteClient={handleDeleteClient} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} adminkey={keyManage} editClientMode={editClientMode} setSelectedClient={setSelectedClient} selectedClient={selectedClient} handleEditClient={handleEditClient} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} close={close} />
      <LeedInfo dataNotices={dataNotices} handleRegistrationNoticeChange={handleRegistrationNoticeChange} registrationDataNotice={registrationDataNotice} handleRegistrationNotice={handleRegistrationNotice} handleClientClick={handleClientClick} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} adminkey={keyManage} editClientViewMode={editClientViewMode} setSelectedClient={setSelectedClient} selectedClient={selectedClient} handleEditClient={handleEditClient} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} close={close} />
    </div>
  );
};

export default View;
