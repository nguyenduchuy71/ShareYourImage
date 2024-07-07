import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ISearchItem {
  type: string;
  placeholder: string;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const SearchItem = ({ type, placeholder, searchText, setSearchText }: ISearchItem) => {
  return (
    <InputGroup className="max-w-md mb-4 mx-auto">
      <Form.Group className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <Form.Control
          type={type}
          id="search"
          className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-transparent"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={placeholder}
        />
      </Form.Group>
    </InputGroup>
  );
};
