import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [list, setfinalList] = useState([]);

	const finalList = { list, setfinalList };

	return (
		<AppContext.Provider value={{ finalList }}>{children}</AppContext.Provider>
	);
};
export { AppContext, AppProvider };
