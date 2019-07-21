let apiname;

/**
 * initialize
 * @param {*} apiname
 */
export const init = (dirname) => {
  const { length } = dirname.split('/');
  apiname = dirname.split('/')[length - 1];
}

/**
 * set api db instance
 * @param {*} api
 * @param {*} db
 */
export const setApiDb = (api, db) => {
  global[api] = {
    db
  };
}

/**
 * get api db instance
 * @param {*} api
 */
export const getApiDb = () => {
  const { db } = global[apiname];
  return db;
}
