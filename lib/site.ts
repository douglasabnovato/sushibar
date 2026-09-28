/* Dados do restaurante em um só lugar; preencha com os reais antes de publicar */
export const site = {
  name: "Sushibar",
  description: "Culinária japonesa com atmosfera refinada: cardápio, bebidas e reservas para eventos.",
  whatsapp: "5511999990000",
  isDemo: true,
} as const;

/* Link do WhatsApp com mensagem codificada */
export const whatsappLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/* Preço em reais */
export const brl = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
/* Fim de site.ts */
