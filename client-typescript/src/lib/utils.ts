import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

export const formatDateTime = (value: any) => {
  return moment(value).format('MMMM Do YYYY, hh:mm:ss');
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const uploadFile = (file: File, pathUpload: string, storage: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a reference to the storage service
    const storageRef = storage.ref();

    // Create a reference to the file you want to upload
    const fileRef = storageRef.child(pathUpload);

    // Upload file to Firebase Storage
    const uploadTask = fileRef.put(file);

    // Monitor upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle progress (optional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress: ', progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        // Handle successful uploads
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      },
    );
  });
};
