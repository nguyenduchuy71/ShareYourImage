export const configHeaders = (accessToken: string, contentType: string = 'application/json') => {
  return {
    'Content-Type': contentType,
    Authorization: `Bearer ${accessToken}`,
  };
};

export const handleErrorStatus = (error: any) => {
  if (error.response && error.response.status === 401) {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('userInfo');
    window.location.href = '/login';
  }
};

export const handleSortListObjectCollection = (listItem: any[]) => {
  return listItem.sort((a, b) => {
    if (a.updated > b.updated) return -1;
    return 1;
  });
};
