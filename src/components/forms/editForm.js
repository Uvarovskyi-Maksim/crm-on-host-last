import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";

import { fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice } from "../common/EditData";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const EditForm = ({
    adminkey,
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    managerIDOptions,
    ManagerStatusOptions,
    handleDeleteClient,
    registrationDataClient,
    handleRegistrationClientChange,
    dataProducts,
    paymentArray,
    handleDateChange,

    close }) => {

    return (
        <div>
            {editClientMode && selectedClient && (
                <div>
                    <div className={`overlay ${editClientMode && selectedClient ? "active" : ""}`} onClick={close}></div>
                    <div className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>

                        <form className='client_reg_form'>
                            <h2 className='leed_head_txt'>Редактирование лида</h2>


                            <div >
                                <h3 style={{ color: "#445486" }}>Контактная информация</h3>
                                <div className='client_info'>
                                    <div className='client_info_left'>
                                        <div className="input_td">
                                            <div className='input_name'>Имя:</div>
                                            <input
                                                type="text"
                                                name="clientName"
                                                value={selectedClient.clientName}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, clientName: e.target.value })}
                                                required
                                            /></div>

                                        <div className="input_td">
                                            <div className='input_name'>Email:</div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={selectedClient.email}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='client_info_right'>
                                        <div className="input_td">
                                            <div className='input_name'>Номер телефона:</div>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={selectedClient.phone}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="input_td">
                                            <div className='input_name'>Второй номер телефона:</div>
                                            <input
                                                type="text"
                                                name="secondPhone"
                                                value={selectedClient.secondPhone}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, secondPhone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <h3 style={{ color: "#445486" }}>Дополнительная информация</h3>
                                    <div className='client_info'>
                                        <div className='client_info_left'>
                                            <div className="input_td">
                                                <div className='input_name'>Менеджер:</div>
                                                <select
                                                    name="managerID"
                                                    value={selectedClient.managerID}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, managerID: e.target.value })}
                                                    required
                                                >
                                                    <option value={adminkey}>Я</option>
                                                    {managerIDOptions.map((option) => (
                                                        <option key={option._id} value={option.managerID}>
                                                            {option.email}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='input_td'>
                                                <div className='input_name'>Статус:</div>
                                                <select
                                                    name="status"
                                                    value={selectedClient.status}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}
                                                    required
                                                >
                                                    <option value="new">Потенциальный</option>
                                                    <option value="in_processing">Я подумаю,наберать систематично</option>
                                                    <option value="agreed">Договорились, но не отгрузили</option>
                                                    <option value="successful">Успешный</option>
                                                    <option value="return">Клиент купил на стороне. Вернуть!</option>
                                                    <option value="nds">НДС</option>
                                                    <option value="wholesale">Опт</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='client_info_right'>
                                            <div className='input_td'>
                                                <div className='input_name'>Продукт:</div>
                                                <select
                                                    name="product"
                                                    value={selectedClient.product}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, product: e.target.value })}
                                                >
                                                    <option value="">Выберите продукт</option>
                                                    {dataProducts.map((buyer) => (
                                                        <option key={buyer._id} value={buyer.name}>
                                                            {buyer.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='input_td'>
                                                <div className='input_name'>Оплата:</div>
                                                <select
                                                    name="payment"
                                                    value={selectedClient.payment}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, payment: e.target.value })}
                                                >
                                                    <option value="">Выберите оплату</option>
                                                    {paymentArray.map((buyer) => (
                                                        <option key={buyer} value={buyer}>
                                                            {buyer}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='input_td'>
                                                <div className='input_name'>Дата созвона:</div>
                                                <DatePicker
                                                    selected={selectedClient.selectedDate ? new Date(selectedClient.selectedDate) : null}
                                                    onChange={(date) => setSelectedClient({ ...selectedClient, selectedDate: date })}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={5}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>





                            </div>

                            <div>

                                <div>

                                </div>



                            </div>



                            <div className="btn_form_block">
                                <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                    Закрыть лид
                                </button>
                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient._id)}>
                                    Сохранить изменения
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

const EditFormBuyer = ({
    editClientMode,
    handleDeleteClient,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    managerIDOptions,
    ManagerStatusOptions,
    close }) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>

                    <form>
                        <h3 style={{ textAlign: "center" }}>Редактирование данных покупателя: {selectedClient.name}</h3>

                        <table style={{ width: "100%" }}>

                            <tbody>

                                <tr>
                                    <td className="input_td">
                                        <div>Имя:</div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={selectedClient.name}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Email:</div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={selectedClient.email}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Номер телефона:</div>
                                        <input
                                            type="phone"
                                            name="phone"
                                            value={selectedClient.phone}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Заметка:</div>
                                        <input
                                            type="text"
                                            name="notice"
                                            value={selectedClient.notice}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, notice: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Менеджер:</div>
                                        <select
                                            name="managerID"
                                            value={selectedClient.managerID}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, managerID: e.target.value })}
                                            required
                                        >
                                            {managerIDOptions.map((option) => (
                                                <option key={option._id} value={option.managerID}>
                                                    {option.email}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>
                            <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                Удалить
                            </button>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient.id)}>
                                Сохранить изменения
                            </button>

                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

const EditFormTask = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    close }) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>

                    <form>
                        <table style={{ width: "100%" }}>

                            <tbody>

                                <tr>
                                    <td className="input_td">
                                        <div>Статус:</div>

                                        <select
                                            name="taskStatus"
                                            value={selectedClient.taskStatus}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, taskStatus: e.target.value })}
                                        >
                                            <option value="false">Не выполнено</option>
                                            <option value="true">Выполнено</option>


                                        </select>
                                    </td>


                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>

                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient._id)}>
                                Сохранить изменения
                            </button>

                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

const EditFormProduct = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    handleDeleteClient,
    close }) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                    <h3 style={{ textAlign: "center" }}>Редактирование продукта: {selectedClient.name}</h3>
                    <div className="close" onClick={close}>
                        &times;
                    </div>

                    <form >
                        <table style={{ width: "100%" }}>
                            <tbody>

                                <tr>
                                    <td className="input_td">
                                        <div>Наименование:</div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={selectedClient.name}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Цена:</div>
                                        <input
                                            type="number"
                                            name="cost"
                                            value={selectedClient.cost}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, cost: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Количество:</div>
                                        <input
                                            type="number"
                                            name="count"
                                            value={selectedClient.count}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, count: e.target.value })}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="btn_form_block">
                            <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                Удалить
                            </button>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient.id)}>
                                Сохранить изменения
                            </button>

                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}
const LeedInfo = ({
    adminkey,
    editClientMode,
    editClientViewMode,
    selectedClient,
    handleClientClick,
    handleEditClient,
    managerIDOptions,
    ManagerStatusOptions,
    handleRegistrationNotice,
    registrationDataNotice,
    handleRegistrationNoticeChange,
    dataNotices,
    close
}) => {
    const [viewEdit, setViewEdit] = useState(false)
    const view = () => {
        setViewEdit(true)
    }
    const noticeArr = dataNotices.filter((notice) => localStorage.getItem('LeedID') === notice.noticeID)
    console.log(noticeArr)

    return (
        <div>
            {editClientViewMode && selectedClient && (
                <>
                    <div className={`overlay ${editClientViewMode && selectedClient ? "active" : ""}`} onClick={close}></div>

                    <div className={`user_modal ${editClientViewMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>
                        <div className="user_modal_left_side">

                            <div className="status_block">
                                <div>Статус: <span>{selectedClient.status}</span> </div> <div>{selectedClient.dateOfCreated}</div>

                            </div>
                            <div className='user_modal_left_main'>
                                <div className='user_modal_left_block'>
                                    <div className="content">
                                        <h3>Про лид</h3>
                                        <label className='el'>Менеджер:</label>
                                        <select
                                            name="managerID"
                                            value={selectedClient.managerID}
                                            required
                                        >
                                            <option value={adminkey}>Я</option>
                                            {managerIDOptions.map((option) => (
                                                <option key={option._id} value={option.managerID}>
                                                    {option.nameManager}
                                                </option>
                                            ))}
                                        </select>

                                        <div className='el'><span>Продукт:</span> {selectedClient.product}</div>
                                        <div className='el'><span>Оплата:</span> {selectedClient.payment}</div>
                                        <div className='el'><span>Дата созвона:</span> {formatDateTime(new Date(selectedClient.selectedDate))}</div>
                                    </div>

                                </div>
                                <div className='user_modal_right_block'>
                                    <div className="content">
                                        <h3>Клиент</h3>
                                        <div className='el' onClick={view}><span>Имя:</span> {selectedClient.clientName}</div>
                                        <div className='el'><span>Почта:</span> {selectedClient.email}</div>
                                        <div className='el'><div style={{ display: "flex" }}><div><span>Номер телефона:</span></div> <div style={{ marginLeft: "10px" }}>{selectedClient.phone} <br /> {selectedClient.secondPhone}</div></div></div>
                                    </div>

                                </div>
                            </div>



                        </div>
                        <div className="user_modal_right_side">
                            <div className='notice_container'>
                                <h4>Комментарии:</h4>
                                <ul className='notice_block'>
                                    {noticeArr.map(notice => (
                                        <li key={notice._id}>
                                            <div className='notice_date'>{notice.noticeDate} </div>

                                            <div className='notice_element'>{notice.content}</div>

                                        </li>
                                    ))}
                                </ul>

                                <div className='add_notice'>
                                    <textarea name="content" placeholder='Введите комментарий' value={registrationDataNotice.content} onChange={handleRegistrationNoticeChange} required cols="30" rows="2"></textarea>

                                    <button type="button" onClick={handleRegistrationNotice}>Отправить</button></div>
                            </div>


                        </div>
                    </div>
                </>
            )}
        </div>


    )
}
// ClientRegistrationForm.js

const ClientRegistrationForm = ({
    addLeedMode,
    adminKey,
    close,
    registrationDataClient,
    handleRegistrationClientChange,
    handleDateChange,
    dataBuyers,
    dataProducts,
    paymentArray,
    handleRegistrationClient,
    setRegistrationDataClient
}) => {
    const [secondPhone, setSecondPhone] = useState(false)

    const openSecondPhoneBlock = () => {
        setSecondPhone(true)
    }

    const closeSecondPhoneBlock = () => {
        setSecondPhone(false)
    }

    return (
        addLeedMode && (
            <>
                <div className={`overlay ${addLeedMode ? "active" : ""}`} onClick={close}></div>

                <div style={{ backgroundColor: "#fff" }} className={`user_modal ${addLeedMode ? 'show' : ''}`}>
                    <form className='client_reg_form'>
                        <h2 className='leed_head_txt'>Создание лида</h2>
                        <div className="close" onClick={close}>
                            &times;
                        </div>
                        {secondPhone && <div>
                            <div style={{ backgroundColor: "#fff", border: "3px solid", top: "39%", width: "20%", left: "64%" }} className={`user_modal ${addLeedMode ? 'show' : ''}`}>
                                <div className="close" onClick={closeSecondPhoneBlock}>
                                    &times;
                                </div>
                                <div className="input_td"><div className='input_name'>Второй номер</div><input type="text" name="secondPhone" value={registrationDataClient.secondPhone} onChange={handleRegistrationClientChange} required /></div>

                            </div>
                        </div>}

                        <div>
                            <h3 style={{ color: "#445486" }}>Контактная информация</h3>
                            <div className='client_info'>

                                <div className='client_info_left'>
                                    <div className="input_td"><div className='input_name'>Имя<span style={{ color: "red" }}>*</span></div><input type="text" name="clientName" value={registrationDataClient.clientName} onChange={handleRegistrationClientChange} required /></div>

                                    <div className="input_td"><div className='input_name'>Email</div><input type="email" name="email" value={registrationDataClient.email} onChange={handleRegistrationClientChange} required /></div>

                                </div>
                                <div className='client_info_right'>
                                    <div className="input_td"><div style={{ position: "relative" }} className='input_name'>Номер телефона<span style={{ color: "red" }}>*</span><div className='open_second_number' onClick={openSecondPhoneBlock}>+</div></div><input type="text" name="phone" value={registrationDataClient.phone} onChange={handleRegistrationClientChange} required /></div>
                                    <div className="input_td">
                                        <div className='input_name'>Покупатель:</div>
                                        <select
                                            name="buyerID"
                                            value={registrationDataClient.buyerID}
                                            onChange={(e) => {
                                                const selectedBuyer = dataBuyers.find((buyer) => buyer.email === e.target.value);
                                                handleRegistrationClientChange(e);
                                                setRegistrationDataClient((prevData) => ({
                                                    ...prevData,
                                                    clientName: selectedBuyer.name,
                                                    email: selectedBuyer.email,
                                                    phone: selectedBuyer.phone,
                                                }));
                                            }}
                                        >
                                            <option value="">Выберите покупателя из базы</option>
                                            {dataBuyers.map((buyer) => (
                                                <option key={buyer._id} value={buyer.email}>
                                                    {buyer.email}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div>
                            <h3 style={{ color: "#445486" }}>Дополнительная информация</h3>
                            <div className='client_info'>
                                <div className='client_info_left'>
                                    <div className="input_td">
                                        <div className='input_name'>Дата созвона:</div>
                                        <DatePicker
                                            className='input_date'
                                            selected={registrationDataClient.selectedDate}
                                            onChange={handleDateChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={5}
                                            dateFormat="dd.MM.yyyy HH:mm"
                                            placeholderText='Выберите дату'

                                        />
                                    </div>
                                    <div className="input_td">

                                        <div className='input_name'>Статус:</div>
                                        <select name="status" value={registrationDataClient.status} onChange={handleRegistrationClientChange}>
                                            <option value="new">Потенциальный</option>
                                            <option value="in_processing">Я подумаю,наберать систематично</option>
                                            <option value="agreed">Договорились, но не отгрузили</option>
                                            <option value="successful">Успешный</option>
                                            <option value="return">Клиент купил на стороне. Вернуть!</option>
                                            <option value="nds">НДС</option>
                                            <option value="wholesale">Опт</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='client_info_right'>
                                    <div className="input_td">
                                        <div className='input_name'>Продукт:</div>
                                        <select name="product" value={registrationDataClient.product} onChange={handleRegistrationClientChange}>
                                            <option value="Товары отсутствуют">Выберите продукт</option>
                                            {dataProducts.map((buyer) => (
                                                <option key={buyer._id} value={buyer.name}>
                                                    {buyer.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input_td">
                                        <div className='input_name'>Оплата:</div>
                                        <select name="payment" value={registrationDataClient.payment} onChange={handleRegistrationClientChange}>
                                            <option value="">Выберите оплату</option>
                                            {paymentArray.map((buyer) => (
                                                <option key={buyer} value={buyer}>
                                                    {buyer}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>



                            <div style={{ display: "none" }} className="input_td">
                                <div>Role:</div>
                                <select name="role" value={registrationDataClient.role} onChange={handleRegistrationClientChange}>
                                    <option value=""></option>
                                    <option value="client">Client</option>
                                </select>
                            </div>

                        </div>


                        <button className='register' type="button" onClick={handleRegistrationClient}>
                            Добавить
                        </button>


                    </form>

                </div>
            </>
        )
    );
};

const TaskForm = ({ selectedManager, registrationDataTask, handleRegistrationTaskChange, handleRegistrationTask }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td className='input_td'>
                                <div>Задание</div>
                                <input type="text" name="taskLine" value={registrationDataTask.taskLine} onChange={handleRegistrationTaskChange} required />
                                <input style={{ display: "none" }} type="text" name="managerID" value={registrationDataTask.managerID = selectedManager.managerID} onChange={handleRegistrationTaskChange} required />
                                <input className="date" type="date" placeholder='Дата начала' value={registrationDataTask.startDate = startDate} onInput={handleStartDateChange} onChange={handleRegistrationTaskChange} />
                                <input className="date" type="date" placeholder='Дата конца' value={registrationDataTask.endDate = endDate} onInput={handleEndDateChange} onChange={handleRegistrationTaskChange} />

                            </td>
                        </tr>
                    </tbody>
                    <button className='register' type="button" onClick={handleRegistrationTask}>
                        Добавить
                    </button>
                </table>
            </div>

        </>
    )
}


const TaskFormRegister = ({ registrationDataTask, handleRegistrationTaskChange, handleRegistrationTask }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td className='input_td'>
                                <div>Задание</div>
                                <input type="text" name="taskLine" value={registrationDataTask.taskLine} onChange={handleRegistrationTaskChange} required />
                                <input className="date" type="date" value={registrationDataTask.startDate = startDate} onInput={handleStartDateChange} onChange={handleRegistrationTaskChange} />
                                <input className="date" type="date" value={registrationDataTask.endDate = endDate} onInput={handleEndDateChange} onChange={handleRegistrationTaskChange} />

                            </td>
                        </tr>
                    </tbody>
                    <button className='register' type="button" onClick={handleRegistrationTask}>
                        Добавить
                    </button>
                </table>
            </div>

        </>
    )
}

const EditManagerForm = ({
    editMode,
    selectedManager,
    handleEditManager,
    setSelectedManager,
    close,
    registrationDataTask,
    handleRegistrationTaskChange,
    handleRegistrationTask
}) => {
    const [taskMode, setTaskMode] = useState(null)
    const toggleTaskMode = () => {
        setTaskMode((prevMode) => {
            return prevMode === "edit" ? null : "edit";
        });
    };
    return (
        editMode && selectedManager && (
            <div>
                <div style={{ display: "block" }} className={`user_modal ${editMode ? 'show' : ''}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                    <form >
                        <table style={{ width: "100%" }}>
                            <h3>Редактирование данных менеджера: {selectedManager.email}</h3>

                            <tbody>

                                <tr>
                                    <td className="input_td">
                                        <div>Имя:</div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={selectedManager.nameManager}
                                            onChange={(e) => setSelectedManager({ ...selectedManager, nameManager: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Email:</div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={selectedManager.email}
                                            onChange={(e) => setSelectedManager({ ...selectedManager, email: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Пароль:</div>
                                        <input
                                            type="text"
                                            name="password"
                                            value={selectedManager.password}
                                            onChange={(e) => setSelectedManager({ ...selectedManager, password: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div className='register add_task' onClick={toggleTaskMode}>Добавить задачу</div>
                                    </td>
                                    {taskMode &&
                                        <TaskForm selectedManager={selectedManager} registrationDataTask={registrationDataTask} handleRegistrationTaskChange={handleRegistrationTaskChange} handleRegistrationTask={handleRegistrationTask} />
                                    }
                                </tr>
                            </tbody>

                            <button type="button" className='register' style={{ width: "150px" }} onClick={() => handleEditManager(selectedManager.id)}>
                                Сохранить изменения
                            </button>
                        </table>
                    </form>
                </div>
            </div>
        )
    );
};

export default ClientRegistrationForm;

export { EditForm, EditFormBuyer, EditFormProduct, LeedInfo, ClientRegistrationForm, EditManagerForm, EditFormTask, TaskFormRegister };