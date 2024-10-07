'use client';
import { useState } from 'react';

interface AlbumSongsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (songs: string[]) => void;
}

const CardAlbumSong: React.FC<AlbumSongsModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [songs, setSongs] = useState<string[]>(['']);

    const handleSongChange = (index: number, value: string) => {
        const updatedSongs = [...songs];
        updatedSongs[index] = value;
        setSongs(updatedSongs);
    };

    const addSong = () => {
        setSongs([...songs, '']);
    };

    const removeSong = (index: number) => {
        const updatedSongs = songs.filter((_, i) => i !== index);
        setSongs(updatedSongs);
    };

    const handleConfirm = () => {
        onConfirm(songs);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
                <h2 className="text-black">Agregar Canciones</h2>
                {songs.map((song, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder={`Canción ${index + 1}`}
                            value={song}
                            onChange={(e) => handleSongChange(index, e.target.value)}
                        />
                        {songs.length > 1 && (
                            <button type="button" onClick={() => removeSong(index)} className="text-black" >Eliminar</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addSong} className="text-black">Agregar Canción</button>
                <br />
                <button type="button" onClick={handleConfirm} className="text-black">Aceptar</button>
                <button type="button" onClick={onClose} className="text-black">Cancelar</button>
            </div>
        </div>
    );
};

export default CardAlbumSong;
