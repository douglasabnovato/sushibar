import { supabase } from "../supabaseClient";

export async function getCategories() {
  let { data: products, error } = await supabase.from("categories").select("*");

  return products;
}

/**
 * 
 * @returns {
      id: 1,
      created_at: '2022-10-28T17:32:10+00:00',
      title: 'Entradas',
      description: 'Confira as entradas',
      icon_url: null,
      primary_color: null,
      secondary_color: null
    }
 */
