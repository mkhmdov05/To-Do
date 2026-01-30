// IndexedDB storage service for todos
class TodoStorage {
  constructor() {
    this.dbName = 'TodoPWA';
    this.version = 1;
    this.storeName = 'todos';
    this.db = null;
    suiii 

  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('completed', 'completed', { unique: false });
          store.createIndex('priority', 'priority', { unique: false });
          store.createIndex('deadline', 'deadline', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  async getAllTodos() {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addTodo(todo) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(todo);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(todo);
    });
  }

  async updateTodo(todo) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(todo);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(todo);
    });
  }

  async deleteTodo(id) {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Fallback to localStorage if IndexedDB is not available
class LocalStorageService {
  constructor() {
    this.key = 'todos';
  }

  async init() {
    // No initialization needed for localStorage
    return Promise.resolve();
  }

  async getAllTodos() {
    try {
      const todos = localStorage.getItem(this.key);
      return todos ? JSON.parse(todos) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  async addTodo(todo) {
    const todos = await this.getAllTodos();
    todos.push(todo);
    localStorage.setItem(this.key, JSON.stringify(todos));
    return todo;
  }

  async updateTodo(updatedTodo) {
    const todos = await this.getAllTodos();
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      localStorage.setItem(this.key, JSON.stringify(todos));
    }
    return updatedTodo;
  }

  async deleteTodo(id) {
    const todos = await this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(this.key, JSON.stringify(filteredTodos));
  }
}

// Factory function to get the appropriate storage service
export const createStorageService = () => {
  // Check if IndexedDB is available
  if (typeof indexedDB !== 'undefined') {
    return new TodoStorage();
  } else {
    console.warn('IndexedDB not available, falling back to localStorage');
    return new LocalStorageService();
  }
};

export default createStorageService;