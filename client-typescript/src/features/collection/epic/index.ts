import { create } from 'zustand';
import axios from 'axios';
import { configHeaders, handleErrorStatus, handleSortListObjectCollection } from '@/utils/helpers';
import { triggerNotify } from '@/utils/messages';
import { storage } from '@/firebase/config';
import { ICollectionStore } from './interface';
import { messages } from './messages'

const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useCollectionStore = create<ICollectionStore>((set, get) => ({
  collections: [],
  isLoading: false,
  error: null,
  getCollectionEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/items`, {
        headers,
      });
      if (res.status === 200) {
        const data: [] = res.data;
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const listImage = await storage.ref().child(userInfo.userId);
        let list_storage_image = [];
        listImage
          .list()
          .then((result) => {
            result.items.forEach(async (imageRef) => {
              const srcImage = await imageRef.getDownloadURL();
              imageRef.getMetadata().then((metadata) => {
                const metadataImage = { ...metadata, srcImage };
                list_storage_image = [...list_storage_image, metadataImage];
                if (data.length === list_storage_image.length) {
                  set({ collections: handleSortListObjectCollection(list_storage_image) });
                }
              });
            });
          })
          .catch((error) => {
            set({ error });
          });
      }
      set({ isLoading: false });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  uploadCollectionEpic: async (files) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken, 'multipart/form-data');
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      const res = await axios.post(`${BASEURL}/items`, formData, {
        headers,
      });
      if (res.status === 200) {
        const imagePaths: string[] = res.data;
        if (imagePaths.length > 0) {
          const listImage = await storage.ref().child(imagePaths[0].split('/')[0]);
          listImage
            .list()
            .then((result) => {
              let newCollections: any[] = []
              result.items.forEach(async (imageRef) => {
                const srcImage = await imageRef.getDownloadURL();
                imageRef.getMetadata().then((metadata) => {
                  if (imagePaths.includes(metadata.fullPath)) {
                    newCollections = [...get().collections, { ...metadata, srcImage }];
                    set({ collections: handleSortListObjectCollection(newCollections) });
                  }
                });
              });
              triggerNotify(messages.uploadSuccess);
            })
            .catch((error) => {
              set({ error });
            });
        }

      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  deteleCollectionEpic: async (imagePath: string, srcImage: string) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.delete(
        `${BASEURL}/items/${imagePath}?srcImage=${encodeURIComponent(srcImage)}`,
        {
          headers,
        },
      );
      if (res.data === 204) {
        const updateCollections = get().collections.filter(
          (collection) => collection.fullPath !== imagePath,
        );
        set({ collections: updateCollections });
        triggerNotify(messages.removeImageSuccess);
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  shareImageEpic: async (item, friendId) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const itemShare = {
        srcImage: item.srcImage,
      };
      const res = await axios.post(
        `${BASEURL}/items/share/${friendId}`,
        {
          ...itemShare,
        },
        {
          headers,
        },
      );
      if (res.status === 200) {
        triggerNotify(messages.shareImageSuccess);
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
