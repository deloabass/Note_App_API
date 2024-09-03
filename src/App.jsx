import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import './App.css'; // Assurez-vous d'ajouter cette ligne si vous utilisez un fichier CSS séparé

// import './Api.js'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  const addNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteContent.trim() !== '') {
      setNotes([...notes, { 
        id: Date.now(), 
        title: newNoteTitle, 
        content: newNoteContent,
        favorite: false // Initialize new notes as not favorite
      }]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setShowAddCard(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEditing = (note) => {
    setEditNoteId(note.id);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.content);
    setShowAddCard(true);
  };

  const saveEditNote = () => {
    if (editNoteTitle.trim() !== '' && editNoteContent.trim() !== '') {
      setNotes(notes.map(note => 
        note.id === editNoteId
          ? { ...note, title: editNoteTitle, content: editNoteContent }
          : note
      ));
      setEditNoteId(null);
      setEditNoteTitle('');
      setEditNoteContent('');
      setShowAddCard(false);
    }
  };

  // Handle toggling of note favorites
  const toggleNoteFavorite = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, favorite: !note.favorite } : note
    ));
  };

  // Filter notes based on favorite status
  const displayedNotes = isFavorite ? notes.filter(note => note.favorite) : notes;

  return (
    <div className="container mx-auto p-4 bg-[#1D3E4A] min-h-screen flex flex-col items-start">
      <a href="#" className="text-white text-2xl font-sans mb-4 self-center">Note App</a>
      
      <div className="w-full flex flex-col items-start space-y-2">
        <button 
          onClick={toggleAddCard}
          className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded flex items-center"
        >
          + Add a new note
        </button>

        <button 
          onClick={toggleFavorite} 
          className="w-20 h-12 bg-orange-200 flex justify-center items-center"
        >
          <Star className={`h-6 w-6 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-500'}`} />
        </button>
      </div>

      {(showAddCard && !editNoteId) && (
        <div className='w-full flex justify-center items-center'>
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Add New Note</h3>
              <button onClick={toggleAddCard} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Note Text"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full p-2 mb-2 border rounded h-24"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={toggleAddCard} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Close
              </button>
              <button onClick={addNote} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {(showAddCard && editNoteId) && (
        <div className='w-full flex justify-center items-center'>
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Edit Note</h3>
              <button onClick={() => { setShowAddCard(false); setEditNoteId(null); }} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={editNoteTitle}
              onChange={(e) => setEditNoteTitle(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Note Text"
              value={editNoteContent}
              onChange={(e) => setEditNoteContent(e.target.value)}
              className="w-full p-2 mb-2 border rounded h-24"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => { setShowAddCard(false); setEditNoteId(null); }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Close
              </button>
              <button onClick={saveEditNote} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed w-80 top-0 left-0 h-full bg-gray-800 p-4 transition-transform transform ${isFavorite ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold">Favorites</h3>
          <button onClick={toggleFavorite} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        {notes.filter(note => note.favorite).length === 0 ? (
          <p className="text-white">No favorite notes</p>
        ) : (
          <ul className="text-white">
            {notes.filter(note => note.favorite).map((note) => (
              <li key={note.id} className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className='flex justify-between items-center mb-2'>
                  <div>
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                  </div>
                  <div className='space-x-2'>
                    <input 
                      type="checkbox" 
                      checked={note.favorite}
                      onChange={() => toggleNoteFavorite(note.id)}
                      className="text-xs" 
                    />
                    <span>Favorite</span>
                  </div> 
                </div>
                <hr className='border-gray-600 mb-5' />
                <div className="text-gray-400 p-2 mb-2">
                  <p>{note.content}</p>
                </div>
                <hr className='border-gray-600 mb-2' />
                <div className="flex justify-start items-center space-x-2">
                  <button onClick={() => startEditing(note)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-[#026433]">Edit Note</button>
                  <button onClick={() => deleteNote(note.id)} className="border-red-500 border text-white px-4 py-2 rounded-lg hover:border-red-600 text-red-600">Delete Note</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full flex justify-center items-center mt-4">
        {displayedNotes.length === 0 ? (
          <p className="text-xl text-white">Votre liste de note est vide</p>
        ) : (
          <ul className="text-white w-full">
            {displayedNotes.map((note) => (
              <div key={note.id} className="bg-gray-700 rounded-lg p-2 my-2">
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <p>{note.content}</p>
                  </div> 
                  <div className='space-x-2'>
                    <input 
                      type="checkbox" 
                      checked={note.favorite}
                      onChange={() => toggleNoteFavorite(note.id)}
                      className="text-xs" 
                    />
                    <span>Favorite</span>
                  </div> 
                </div>
                <hr className='border-gray-600 mb-5' />
                <div className="text-gray-400 p-2 mb-2">
                  <p>{note.content}</p>
                </div>
                <hr className='border-gray-600 mb-5' />
                <div className="flex justify-start items-center space-x-2">
                  <button onClick={() => startEditing(note)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-[#026433]">Edit Note</button>
                  <button onClick={() => deleteNote(note.id)} className="border-red-500 border text-white px-4 py-2 rounded-lg hover:border-red-600 text-red-600">Delete Note</button>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
