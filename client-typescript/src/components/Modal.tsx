import { useState } from 'react';
import DropBoxFriend from './DropBoxFriend';

export default function Modal({ friends, showModal, setShowModal, selectedItem, action }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handleAction = () => {
    action(selectedItem, friends[0].id);
    setShowModal(false);
    console.log(selectedFriend);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">Share your image</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Choose your friends
                    </p>
                    <div className="w-full mt-2">
                      {friends.length > 0 ? (
                        <DropBoxFriend friends={friends} setSelectedFriend={setSelectedFriend} />
                      ) : (
                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                          You don't have friend
                        </p>
                      )}
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-0.5 mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                        onClick={() => handleAction()}
                      >
                        Share
                      </button>
                      <button
                        className="w-0.5 mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
