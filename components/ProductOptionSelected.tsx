/* Aba de categoria acessível (antes era uma div clicável, sem teclado nem estado para leitores de tela) */
interface PropTypes {
  isSelected: boolean;
  contentValue: string;
  controls: string;
  onClick(): void;
}

export default function ProductOptionSelected({ contentValue, isSelected, controls, onClick }: PropTypes) {
  return (
    <button type="button" role="tab" aria-selected={isSelected} aria-controls={controls} onClick={onClick}
      className={`px-2 py-1 text-lg font-sans ${isSelected ? "text-[#9a3412]" : "text-tahiti-56"}`}>
      {contentValue}
      <span aria-hidden="true" className={`block w-2 h-2 rounded-full mx-auto mt-0.5 ${isSelected ? "bg-[#9a3412]" : "bg-transparent"}`} />
    </button>
  );
}
/* Fim de ProductOptionSelected.tsx */
