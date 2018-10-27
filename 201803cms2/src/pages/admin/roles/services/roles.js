import request from '../../../../utils/request';
import qs from 'qs';
const ENTITY = 'roles';
export function list(current, pageSize, conditions) {
  return request(`/${ENTITY}?current=${current}&pageSize=${pageSize}&${qs.stringify(conditions)}`, {});
}
export function getResources() {
  return request('/roles/getResources');
}
export function getUsers() {
  return request('/roles/getUsers');
}
export function create(payload) {
  return request(`/${ENTITY}`, {
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(payload)
  });
}
export function setResources(roleId, resourceIds) {
  return request(`/${ENTITY}/setResources`, {
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({ roleId, resourceIds })
  });
}
export function setUsers(roleId, userIds) {
  return request(`/${ENTITY}/setUsers`, {
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({ roleId, userIds })
  });
}

export function update(payload) {
  return request(`/${ENTITY}/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(payload)
  });
}

export function remove(id) {
  return request(`/${ENTITY}/${id}`, {
    method: 'DELETE'
  });
}

export function delMulti(ids) {
  return request(`/${ENTITY}/${ids[0]}`, {
    method: 'DELETE',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(ids)
  });
}