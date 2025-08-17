import React, { createContext, useState, useContext } from 'react';

const setContext = createContext({
  notes: [],
  setNotes: () => {},
  selected: "",
  setSelected: () => {}
})

const Provider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState("");

  const valueToshare = {
    notes,
    setNotes,
    selected,
    setSelected
  }

  return(
  <setContext.Provider value={valueToshare}>
    {children}
  </setContext.Provider>
)
};

const NotesContext = () => {
  return useContext(setContext);
}

export { Provider };
export default NotesContext;
