/**
 * Capa de persistencia basada en localStorage.
 *
 * Imita la forma de la API de almacenamiento usada en el prototipo
 * (get/set/delete/list con una bandera "shared"), para que sea fácil
 * sustituirla más adelante por llamadas reales a un backend/API sin tener
 * que tocar el resto de la aplicación.
 *
 * "shared" no tiene un significado especial aquí (todo vive en el mismo
 * navegador), pero se mantiene el parámetro para preservar la interfaz.
 */
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
const NAMESPACE = "bh_store";

function storageKey(key, shared) {
  return `${NAMESPACE}::${shared ? "shared" : "personal"}::${key}`;
}

export const storage = {
  async get(key, shared = false) {
    try {
      const raw = localStorage.getItem(storageKey(key, shared));
      if (raw === null) return null;
      return { key, value: raw, shared };
    } catch (e) {
      console.error("storage.get error", e);
      return null;
    }
  },

  async set(key, value, shared = false) {
    try {
      localStorage.setItem(storageKey(key, shared), value);
      return { key, value, shared };
    } catch (e) {
      console.error("storage.set error", e);
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      localStorage.removeItem(storageKey(key, shared));
      return { key, deleted: true, shared };
    } catch (e) {
      console.error("storage.delete error", e);
      return null;
    }
  },

  async list(prefix = "", shared = false) {
    try {
      const fullPrefix = storageKey(prefix, shared);
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(fullPrefix))
        .map((k) => k.slice(storageKey("", shared).length));
      return { keys, prefix, shared };
    } catch (e) {
      console.error("storage.list error", e);
      return null;
    }
  },
};

export async function loadData(key, shared, fallback) {
  try {
    const ref = doc(db, "storage", storageKey(key, shared));
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data().value;
    }

    return fallback;
  } catch (e) {
    console.error("loadData error", e);
    return fallback;
  }
}

export async function saveData(key, shared, value) {
  try {
    const ref = doc(db, "storage", storageKey(key, shared));

    await setDoc(ref, {
      value,
    });
  } catch (e) {
    console.error("saveData error", e);
  }
}