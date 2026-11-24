import { useState } from 'react';
import { supabase } from '../supabase';
import Cartao from './Cartao';
import styles from './Formulario.module.css';

const VAZIO = { resposta_1: '', resposta_2: 0, resposta_3: '' };

export default function Formulario({ tema, aoEnviar }) {
  // Formulário controlado: cada campo vive no estado e o input lê dele.
  const [form, setForm] = useState(VAZIO);
  // Os três estados da requisição: 'enviando', 'enviado' e 'erro' (mais o 'parado' inicial).
  const [status, setStatus] = useState('parado');
  const [mensagemErro, setMensagemErro] = useState('');

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    if (status === 'enviado' || status === 'erro') setStatus('parado');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.resposta_1 || !form.resposta_2) {
      setMensagemErro('Responda a primeira e a segunda pergunta antes de enviar.');
      setStatus('erro');
      return;
    }

    setStatus('enviando');
    setMensagemErro('');

    try {
      if (!supabase) {
        throw new Error('O app não encontrou as chaves do Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY).');
      }

      const { error } = await supabase.from('opinioes').insert({
        tema: tema.id,
        resposta_1: form.resposta_1,
        resposta_2: Number(form.resposta_2),
        resposta_3: form.resposta_3.trim() || null,
      });

      if (error) throw error;

      setStatus('enviado');
      setForm(VAZIO);
      aoEnviar();
    } catch (err) {
      setMensagemErro(err.message || 'Não foi possível enviar. Verifique sua conexão e tente de novo.');
      setStatus('erro');
    }
  }

  const enviando = status === 'enviando';

  return (
    <Cartao titulo="Sua opinião (anônima)">
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset className={styles.grupo} disabled={enviando}>
          <legend className={styles.pergunta}>{tema.p1.texto}</legend>
          {tema.p1.opcoes.map((op) => (
            <label key={op} className={styles.opcao}>
              <input
                type="radio"
                name="resposta_1"
                value={op}
                checked={form.resposta_1 === op}
                onChange={(e) => atualizar('resposta_1', e.target.value)}
              />
              {op}
            </label>
          ))}
        </fieldset>

        <fieldset className={styles.grupo} disabled={enviando}>
          <legend className={styles.pergunta}>{tema.p2}</legend>
          <div className={styles.escala}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className={styles.nota}>
                <input
                  type="radio"
                  name="resposta_2"
                  value={n}
                  checked={Number(form.resposta_2) === n}
                  onChange={(e) => atualizar('resposta_2', e.target.value)}
                />
                {n}
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.grupo}>
          <label htmlFor="resposta_3" className={styles.pergunta}>
            {tema.p3} <span className={styles.opcional}>(opcional)</span>
          </label>
          <textarea
            id="resposta_3"
            rows={4}
            value={form.resposta_3}
            disabled={enviando}
            onChange={(e) => atualizar('resposta_3', e.target.value)}
            className={styles.texto}
          />
        </div>

        <button type="submit" className={styles.botao} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar resposta'}
        </button>

        {status === 'enviado' && (
          <p className={styles.ok} role="status">Resposta enviada. Veja o resultado na aba Resultados.</p>
        )}
        {status === 'erro' && (
          <p className={styles.erro} role="alert">Erro: {mensagemErro}</p>
        )}
      </form>
    </Cartao>
  );
}
