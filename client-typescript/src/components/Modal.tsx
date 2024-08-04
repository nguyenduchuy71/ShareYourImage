import React, { useState } from 'react';
import DropBoxFriend from './DropBoxFriend';
import { Button } from "@/components/ui/button"

export default function Modal({ friends, showModal, setShowModal, selectedItem, handleShareImage }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handleAction = () => {
    handleShareImage(selectedItem, selectedFriend.id);
    setShowModal(false);
  };
  return (
    <React.Fragment>
      {showModal ? (
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
                      <DropBoxFriend friends={friends} selectedFriend={selectedFriend}
                        setSelectedFriend={setSelectedFriend} />
                    ) : (
                      <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                        You don't have friend
                      </p>
                    )}
                  </div>
                  <div className="items-center justify-end gap-2 mt-3 sm:flex">
                    <Button onClick={() => handleAction()}>
                      Share
                    </Button>
                    <Button variant='destructive' onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
