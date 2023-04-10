import s from './Searchbar.module.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useState } from 'react';

const Searchbar = ({ handleFormSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') return;

    handleFormSubmit(searchName);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <BiSearchAlt2
            style={{ width: '24px', height: '24px', fill: 'grey' }}
          />
        </button>

        <input
          className={s.SearchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={e => setSearchName(e.currentTarget.value.toLowerCase())}
        />
      </form>
    </header>
  );
};

export default Searchbar;
