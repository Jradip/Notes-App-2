import { openDB } from 'idb';

const DATABASE_NAME = 'citycare-db';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'offline-stories';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
  },
});

export async function saveStoryOffline(story) {
  return (await dbPromise).put(OBJECT_STORE_NAME, story);
}

export async function getAllOfflineStories() {
  return (await dbPromise).getAll(OBJECT_STORE_NAME);
}

export async function deleteOfflineStory(id) {
  return (await dbPromise).delete(OBJECT_STORE_NAME, id);
}
