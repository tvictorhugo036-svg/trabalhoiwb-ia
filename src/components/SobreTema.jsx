import Cartao from './Cartao';
import styles from './SobreTema.module.css';

// =====================================================================
// ESTA TELA É DA DUPLA. O enunciado exige texto próprio, fontes citadas
// e imagens com licença livre e crédito (vale 20 pontos).
// Substitua o conteúdo abaixo pelo que vocês escreverem.
// =====================================================================
// Sugestão de ordem para os parágrafos (escrevam com as palavras de vocês):
// 1) O que é IA generativa (ex.: ChatGPT) e por que virou assunto nas escolas.
// 2) Como a escola e o mundo estão lidando: a UNESCO publicou orientações em 2023.
// 3) O problema das respostas erradas ("alucinações") e por que conferir a resposta importa.
const PARAGRAFOS = [
  'ESCREVA AQUI o primeiro parágrafo: o que é o tema, com palavras de vocês.',
  'ESCREVA AQUI o segundo parágrafo: por que o tema importa em Araraquara ou no campus.',
  'ESCREVA AQUI o terceiro parágrafo: o que vocês querem descobrir com o formulário.',
];

// Fontes para consultar. LEIAM cada uma antes de citar e removam as que não usarem.
const FONTES = [
  {
    titulo: 'Guia para a IA generativa na educação e na pesquisa (UNESCO, 2023)',
    site: 'UNESCO, versão em português hospedada pela UFMS',
    url: 'https://faed.ufms.br/files/2025/01/390241por.pdf',
  },
  {
    titulo: 'Unesco propõe regulamentação de IA generativa nas escolas',
    site: 'ONU News',
    url: 'https://news.un.org/pt/story/2023/09/1820107',
  },
  {
    titulo: 'Does ChatGPT tell the truth? (alucinações)',
    site: 'Central de Ajuda da OpenAI',
    url: 'https://help.openai.com/pt-br/articles/8313428-does-chatgpt-tell-the-truth',
  },
  {
    titulo: 'Glossário de IA generativa no serviço público',
    site: 'Governo Digital (gov.br)',
    url: 'https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/glossario-ia-generativa-no-servico-publico.pdf',
  },
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
