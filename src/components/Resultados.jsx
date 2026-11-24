import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Cartao from './Cartao';
import styles from './Resultados.module.css';

export default function Resultados({ tema, versao }) {
  const [linhas, setLinhas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro('');
      try {
        if (!supabase) {
          throw new Error('O app não encontrou as chaves do Supabase.');
        }
        const { data, error } = await supabase
          .from('opinioes')
          .select('resposta_1, resposta_2, resposta_3, criado_em')
          .eq('tema', tema.id)
          .order('criado_em', { ascending: false });
        if (error) throw error;
        if (ativo) setLinhas(data);
      } catch (err) {
        if (ativo) setErro(err.message || 'Não foi possível carregar os resultados.');
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => { ativo = false; };
  }, [tema.id, versao]);

  if (carregando) return <Cartao><p>Carregando resultados...</p></Cartao>;
  if (erro) return <Cartao titulo="Resultados"><p className={styles.erro} role="alert">Erro: {erro}</p></Cartao>;

  if (linhas.length === 0) {
    return (
      <Cartao titulo="Resultados">
        <p>Ainda não há respostas. Seja a primeira pessoa a responder na aba Responder.</p>
      </Cartao>
    );
  }

  const total = linhas.length;
  const contagem = tema.p1.opcoes.map((op) => ({
    opcao: op,
    n: linhas.filter((l) => l.resposta_1 === op).length,
  }));
  const media = linhas.reduce((soma, l) => soma + l.resposta_2, 0) / total;
  const comentarios = linhas.filter((l) => l.resposta_3);

  return (
    <>
      <Cartao titulo={`${total} ${total === 1 ? 'resposta' : 'respostas'}`}>
        <h3 className={styles.pergunta}>{tema.p1.texto}</h3>
        <ul className={styles.barras}>
          {contagem.map((c) => (
            <li key={c.opcao} className={styles.linha}>
              <span className={styles.rotulo}>{c.opcao}</span>
              <span className={styles.trilho}>
                <span className={styles.barra} style={{ width: `${(c.n / total) * 100}%` }} />
              </span>
              <span className={styles.numero}>{c.n}</span>
            </li>
          ))}
        </ul>
      </Cartao>

      <Cartao>
        <h3 className={styles.pergunta}>{tema.p2}</h3>
        <p className={styles.media}>{media.toFixed(1).replace('.', ',')} <span>de 5 em média</span></p>
      </Cartao>

      <Cartao titulo="Comentários">
        {comentarios.length === 0 ? (
          <p>Ninguém deixou comentário ainda.</p>
        ) : (
          <ul className={styles.comentarios}>
            {comentarios.map((c, i) => (
              <li key={`${c.criado_em}-${i}`}>{c.resposta_3}</li>
            ))}
          </ul>
        )}
      </Cartao>
    </>
  );
}
