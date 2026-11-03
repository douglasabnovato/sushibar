/* Aba de categoria acessível: só a aba ativa entra no Tab; as setas trocam de aba (padrão APG) */
interface PropTypes {
  id: string;
  isSelected: boolean;
  contentValue: string;
  controls: string;
  onClick(): void;
}

export default function ProductOptionSelected({ id, contentValue, isSelected, controls, onClick }: PropTypes) {
  return (
    <button type="button" role="tab" id={id} aria-selected={isSelected} aria-controls={controls} tabIndex={isSelected ? 0 : -1} onClick={onClick}
      className={`px-2 py-1 text-lg font-sans ${isSelected ? "text-[#9a3412]" : "text-tahiti-56"}`}>
      {contentValue}
      <span aria-hidden="true" className={`block w-2 h-2 rounded-full mx-auto mt-0.5 ${isSelected ? "bg-[#9a3412]" : "bg-transparent"}`} />
    </button>
  );
}
/* Fim de ProductOptionSelected.tsx */
