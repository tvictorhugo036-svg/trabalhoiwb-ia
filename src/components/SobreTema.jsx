import Cartao from './Cartao';
import styles from './SobreTema.module.css';

// =====================================================================
// ESTA TELA É DA DUPLA. O enunciado exige texto próprio, fontes citadas
// e imagens com licença livre e crédito (vale 20 pontos).
// Substitua o conteúdo abaixo pelo que vocês escreverem.
// =====================================================================
const PARAGRAFOS = [
  'ESCREVA AQUI o primeiro parágrafo: o que é o tema, com palavras de vocês.',
  'ESCREVA AQUI o segundo parágrafo: por que o tema importa em Araraquara ou no campus.',
  'ESCREVA AQUI o terceiro parágrafo: o que vocês querem descobrir com o formulário.',
];

const FONTES = [
  // { titulo: 'Título da página ou do artigo', site: 'Nome do site', url: 'https://...' },
];

const IMAGENS = [
  // { src: '/imagem.jpg', alt: 'Descrição da imagem', credito: 'Autor, licença CC BY 4.0, via Wikimedia Commons' },
];

export default function SobreTema({ tema }) {
  return (
    <>
      <Cartao titulo={`Sobre: ${tema.nome}`}>
        {PARAGRAFOS.map((p, i) => (
          <p key={i} className={styles.paragrafo}>{p}</p>
        ))}
      </Cartao>

      {IMAGENS.length > 0 && (
        <Cartao titulo="Imagens">
          {IMAGENS.map((img) => (
            <figure key={img.src} className={styles.figura}>
              <img src={img.src} alt={img.alt} className={styles.imagem} />
              <figcaption className={styles.legenda}>{img.credito}</figcaption>
            </figure>
          ))}
        </Cartao>
      )}

      <Cartao titulo="Fontes">
        {FONTES.length === 0 ? (
          <p className={styles.paragrafo}>Adicione as fontes consultadas na lista FONTES.</p>
        ) : (
          <ul className={styles.fontes}>
            {FONTES.map((f) => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noreferrer">{f.titulo}</a> — {f.site}
              </li>
            ))}
          </ul>
        )}
      </Cartao>
    </>
  );
}
