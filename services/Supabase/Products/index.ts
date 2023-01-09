import { supabase } from "../supabaseClient";

export async function getProducts() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*, categories(title)");

  return products;
}
