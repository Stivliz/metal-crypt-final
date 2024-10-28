import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface SongModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: string[];
}

const SongModal = ({ isOpen, onClose, songs }: SongModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Album Songs
            </ModalHeader>
            <ModalBody>
              <ul className="list-disc pl-5">
                {songs.map((song, index) => (
                  <li key={index} className="text-white">
                    {song}
                  </li>
                ))}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SongModal;
