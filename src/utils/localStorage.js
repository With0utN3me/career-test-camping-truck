export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to save to localStorage', e);
    }
};

export const loadFromLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    } catch (e) {
        console.error('Failed to load from localStorage', e);
        return [];
    }
};

export const removeFromLocalStorage = (key, value) => {
    try {
        const items = loadFromLocalStorage(key);
        const updatedItems = items.filter(item => !value.includes(item));
        saveToLocalStorage(key, updatedItems);
    } catch (e) {
        console.error('Failed to remove from localStorage', e);
    }
};