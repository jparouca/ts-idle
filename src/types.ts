type GameState = {
  faction: 'Demacia' | 'Noxus' | 'Piltover' | null;
  damage: number;
  life: number;
  attackSpeed: number;
  enemy?: Enemy | null;
}

type Enemy = {
  name: string;
  damage: number;
  life: number;
  attackSpeed: number;
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectFaction: (faction: 'Demacia' | 'Noxus' | 'Piltover') => void;
};
