import { useEffect, useState, useRef } from 'react';
import { useProfileStore } from './epic';
import { ButtonItem } from '@/components/ButtonItem';
import { IProfileStore } from './epic/interface';
import { CameraIcon } from '@heroicons/react/24/solid';
import { Input } from '@/components/ui/input';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [userInfo, getUserEpic, updateUserInfoEpic] = useProfileStore((state: IProfileStore) => [
    state.userInfo,
    state.getUserEpic,
    state.updateUserInfoEpic,
  ]);
  useEffect(() => {
    getUserEpic();
  }, [getUserEpic]);

  useEffect(() => {
    setUsername(userInfo.username);
    setBio(userInfo.bio);
    setAvatar(userInfo.avatar);
  }, [userInfo]);

  const handleUpdateUserInfo = (userInfo: any) => {
    updateUserInfoEpic(userInfo);
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto py-6 dark:bg-gray-900">
      <div
        className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
        <h1
          className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2">
          Profile
        </h1>
        <div>
          <div
            className="w-full rounded-sm bg-[url('https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png')] bg-cover bg-center bg-no-repeat items-center">

            <div className="flex justify-center relative py-2">
              <img
                src={avatar ? avatar : 'https://github.com/shadcn.png'}
                className="w-44 h-44 rounded-full object-center inline-block"
                alt="Avatar"
              />

              <div className="absolute bottom-0 right-2">
                <button onClick={handleClick}>
                  <input
                    id="upload_profile"
                    name="file-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChangeAvatar}
                    accept="image/*"
                    multiple={false}
                    className="hidden"
                  />
                  <CameraIcon className="h-8 w-8 hover:opacity-100 opacity-80 text-amber-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-10 lg:flex-nowrap md:flex-wrap sm:flex-wrap xs:flex-wrap ">
            <div className="w-full">
              <h3 className="my-2 font-bold">First name</h3>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First name"
              />
            </div>

            <div className="w-full">
              <h3 className="my-2 font-bold">Last name</h3>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="flex flex-row gap-x-10 lg:flex-nowrap md:flex-wrap sm:flex-wrap xs:flex-wrap ">
            <div className="w-full">
              <h3 className="my-2 font-bold">Username</h3>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={(e: any) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="w-full">
              <h3 className="my-2 font-bold">Bio</h3>
              <Input
                type="text"
                name="bio"
                id="bio"
                placeholder="Type your bio here."
                value={bio}
                onChange={(e: any) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-x-10 lg:flex-nowrap md:flex-wrap sm:flex-wrap xs:flex-wrap ">
            <div className="w-full">
              <h3 className="my-2 font-bold">Sex</h3>
              <select
                className="w-full rounded-lg p-2 border border-gray-500">
                <option disabled value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-full">
              <h3 className="my-2 font-bold">Date Of Birth</h3>
              <Input type="date" />
            </div>
          </div>

          <div className="w-full mt-4 rounded-lg text-white text-lg font-semibold">
            <ButtonItem
              typeButton="submit"
              classNameValue="w-full rounded-md w-20 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              nameButton="Save"
              action={() =>
                handleUpdateUserInfo({
                  email: userInfo.email,
                  username,
                  bio,
                  avatar: newAvatar ? newAvatar : avatar,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
