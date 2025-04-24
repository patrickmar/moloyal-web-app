"use client";
export const store = (storageKey: string, value: any) => {
  // encrypt the value
  const encryptedValue =
    typeof window !== "undefined" ? btoa(escape(JSON.stringify(value))) : null;
  encryptedValue
    ? window.localStorage.setItem(storageKey, encryptedValue)
    : false;
};

export const get = (storageKey: string) => {
  const res =
    typeof window !== "undefined"
      ? window.localStorage.getItem(storageKey)
      : null;
  // decrypt the value
  return res ? JSON.parse(unescape(atob(res))) : false;
};

export const removeItem = (storageKey: string) => {
  return typeof window !== "undefined"
    ? window.localStorage.removeItem(storageKey)
    : false;
};

export const clear = () => {
  return typeof window !== "undefined" ? window.localStorage.clear() : false;
};
