import Cartao from './Cartao';
import styles from './SobreTema.module.css';

const PARAGRAFOS = [
  'A inteligência artificial generativa é um tipo de tecnologia capaz de criar textos, imagens, vídeos, músicas e até códigos de programação a partir de um pedido escrito. Ela ficou conhecida do grande público em novembro de 2022, com o lançamento do ChatGPT, que se tornou o aplicativo de crescimento mais rápido da história. Desde então, ferramentas desse tipo passaram a fazer parte da rotina de muitos estudantes, que as usam para tirar dúvidas, resumir conteúdos e fazer trabalhos escolares.',
  'O uso da IA na escola levanta dúvidas sobre ética, privacidade dos dados e aprendizagem. Em 2023, a UNESCO publicou a primeira orientação global sobre o uso da IA generativa na educação e na pesquisa, recomendando que os governos regulamentem essas ferramentas nas instituições de ensino. Uma pesquisa da própria UNESCO, feita com mais de 450 escolas e universidades, mostrou que menos de 10% delas tinham políticas ou orientações formais sobre o assunto. Ou seja, muitos estudantes usam a IA sem regras claras sobre como e quando usar.',
  'Um dos principais problemas da IA generativa são as chamadas alucinações: respostas que parecem corretas e convincentes, mas trazem informações falsas, como datas, definições e fatos incorretos. Isso acontece porque esses sistemas geram o texto que parece mais provável, e não consultam uma fonte para confirmar se ele é verdadeiro. Por isso, é importante conferir o que a IA responde, principalmente em trabalhos escolares. Com este formulário, queremos saber com que frequência a turma usa IA nos estudos, quanto confia nas respostas e em que momentos percebeu um erro.',
];
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
