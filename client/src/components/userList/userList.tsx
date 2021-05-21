import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {userChanges} from '../../types';
import {modifyUser, getUsers} from '../../app/actions/actionsUser/index';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {userToken} from '../../app/reducers/registerReducer';
import './userList.css';

const UserList = (props:any) => {
  const [changes, setChanges] = useState<userChanges>({
    id: props.id,
    name: props.name,
    firstName: props.firstName,
    lastName: props.lastName,
    birthday: props.birthday,
    country: props.country,
    email: props.email,
    password: props.password,
    role: props.role,
    status: props.status,
  });
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleRoleChange = (e: any) => {
    setChanges({...changes, role: e.label});
  };
  const handleStatusChange = (e:any) => {
    setChanges({...changes, status: e.target.label});
  };
  const handleSubmit = () => {
    dispatch(modifyUser(changes, token));
    setChanges({
      id: '',
      name: '',
      firstName: '',
      lastName: '',
      birthday: '',
      country: '',
      email: '',
      password: '',
      role: '',
      status: '',
    });
  };
  useEffect(() => {
    dispatch(getUsers(token));
  }, [changes]);
  return (
    <div className='userListGrid'>
      <h1 className='userListName'>{props.name}</h1>
      <p className='userListFirstName'>{props.firstName}</p>
      <p className='userListLastName'>{props.lastName}</p>
      <p className='userListBirthday'>{props.birthday}</p>
      <p className='userListCountry'>{props.country}</p>
      <p className='userListEmail'>{props.email}</p>
      <Select className='userListRole' placeholder={props.role}
        onChange={handleRoleChange} options={props.roles}></Select>
      <Select className='userListStatus' placeholder={props.status}
        onChange={handleStatusChange} options={props.statuses}></Select>
      <button className='userListSubmitButton' onClick={handleSubmit}>
        Send Changes
      </button>
    </div>
  );
};

export default UserList;
