"use client";
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

interface SearchProps {
  data: any[];
  onSearch: (results: any[]) => void;
  placeholder?: string;
  searchFields: string[];
}

const GlobalSearch: React.FC<SearchProps> = ({ data, onSearch, placeholder, searchFields }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (!query.trim()) {
      onSearch(data);
    } else {
      const filteredData = data.filter(item =>
        searchFields.some(field => 
          item[field].toLowerCase().includes(query.toLowerCase())
        )
      );
      onSearch(filteredData);
    }
  }, [query, data, onSearch, searchFields]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const filteredData = data.filter(item =>
      searchFields.some(field =>
        item[field].toLowerCase().includes(query.toLowerCase())
      )
    );
    onSearch(filteredData);
  };

  const handleRefresh = () => {
    setQuery('');
    onSearch(data);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(event as any);
    }
  };

  return (
    <div className='py-5 flex items-center justify-between'>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        className='bg-blue-100'
      >
        <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <SearchIcon className='text-blue-500' />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="button" onClick={handleRefresh} sx={{ p: '10px' }} aria-label="refresh">
          <SyncAltIcon className='text-blue-500' />
        </IconButton>
      </Paper>
      <div className='flex gap-5 items-center'>
        <NotificationsNoneIcon className='text-black' />
        <LogoutIcon className='text-red-500' />
      </div>
    </div>
  );
};

export default GlobalSearch;
