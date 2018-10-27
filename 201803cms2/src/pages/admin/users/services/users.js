import request from '../../../../utils/request';
import qs from 'qs';
export function list(current, pageSize, conditions) {
  return request(`/users?current=${current}&pageSize=${pageSize}&${qs.stringify(conditions)}`, {});
}

export function create(payload) {
  return request(`/users`, {
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(payload)
  });
}

export function update(payload) {
  return request(`/users/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(payload)
  });
}

export function remove(id) {
  return request(`/users/${id}`, {
    method: 'DELETE'
  });
}

export function delMulti(ids) {
  return request(`/users/${ids[0]}`, {
    method: 'DELETE',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify(ids)
  });
}