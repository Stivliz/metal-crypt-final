import { useState } from 'react';
import BandsService from "@/services/bands.service";
import Cookies from "universal-cookie";

interface BandDescriptionFormProps {
  idBand: any;
  initialDescriptionBand?: string | null;
  onUpdateDescription: (newDescription: string) => void;
}

const BandDescriptionForm: React.FC<BandDescriptionFormProps> = ({ idBand, initialDescriptionBand, onUpdateDescription }) => {
  const [description, setDescription] = useState<string>(initialDescriptionBand || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const $Band = new BandsService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await $Band.updateDescrition(description, idBand )

      if (!response.status) {
        setSuccess(true);
      }

      if (response.status) {
        onUpdateDescription(description);

        const cookies = new Cookies();
        cookies.set("description", description, { path: "/" });
        setDescription("")
      } else {
        setError('Error actualizando la descripción');
      }

    } catch (error) {
      setError('Error actualizando la descripción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="border p-2 w-full rounded text-black"
        placeholder="Agrega/Edita una descripción para la banda"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Descripción actualizada con éxito!</p>}
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? 'Actualizando...' : 'Actualizar Descripción'}
      </button>
    </form>
  );
};

export default BandDescriptionForm;