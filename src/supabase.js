import { createClient } from '@supabase/supabase-js';

// O Vite só entrega ao navegador variáveis que começam com VITE_
const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Se as variáveis estiverem faltando (ex.: não cadastradas no Netlify),
// exportamos null e os componentes mostram uma mensagem clara em vez de tela branca.
export const supabase = url && chave ? createClient(url, chave) : null;
