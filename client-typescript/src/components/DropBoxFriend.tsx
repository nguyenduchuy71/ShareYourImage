import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ImageItem } from './ImageItem';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function DropBoxFriend({ friends, selectedFriend, setSelectedFriend }) {
  const [selected, setSelected] = useState(friends[0]);

  useEffect(() => {
    if (selectedFriend) {
      setSelected(selectedFriend)
    }
    return () => {
    };
  }, [selectedFriend])

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        setSelected(e);
        setSelectedFriend(e);
      }}
    >
      {({ open }) => (
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-xl ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <ImageItem
                imageSrc={selected.avatar}
                imageAlt="avatar"
                customStyle="h-5 w-5 flex-shrink-0 rounded-full"
              />
              <span className="ml-3 block truncate text-black">{selected.username}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="border border-gray-300 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {friends.map((friend) => (
                <Listbox.Option
                  key={friend.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-[#ABF600]' : 'text-black',
                      'relative cursor-default select-none py-2 pl-3 pr-9 rounded-md',
                    )
                  }
                  value={friend}
                >
                  {({ selected }) => (
                    <div>
                      <div className="flex items-center hover:text-[#ABF600]">
                        <ImageItem
                          imageSrc={friend.avatar}
                          imageAlt="avatar"
                          customStyle="h-5 w-5 flex-shrink-0 rounded-full"
                        />
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-2 block truncate text-black',
                          )}
                        >
                          {friend.username}
                        </span>
                      </div>
                      {selectedFriend && friend.id === selectedFriend.id && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black font-semibold">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

export default DropBoxFriend;
