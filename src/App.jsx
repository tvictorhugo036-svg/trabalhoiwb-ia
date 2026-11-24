
import { useState } from 'react';
import { TEMA } from './temas';
import SobreTema from './components/SobreTema';
import Formulario from './components/Formulario';
import Resultados from './components/Resultados';
import styles from './App.module.css';

const ABAS = [
  { id: 'sobre', rotulo: 'Sobre o tema' },
  { id: 'formulario', rotulo: 'Responder' },
  { id: 'resultados', rotulo: 'Resultados' },
];

export default function App() {
  const tema = TEMA;
  const [aba, setAba] = useState('sobre');
  const [versao, setVersao] = useState(0);

  return (
    <div className={styles.pagina}>
      <header className={styles.hero}>
        <div className={styles.textoHero}>
          <p className={styles.turma}>
            ARQIWEB2 · IFSP Araraquara
          </p>

          <h1 className={styles.titulo}>{tema.nome}</h1>

          <p className={styles.sub}>
            Responda 3 perguntas rápidas e veja o que a turma pensa.
          </p>
        </div>

        <img
          src="/img/ia-rede.svg"
          alt="Ilustração de inteligência artificial"
          className={styles.arte}
        />
      </header>

      <nav className={styles.abas} aria-label="Seções do app">
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            className={aba === a.id ? styles.abaAtiva : styles.aba}
            onClick={() => setAba(a.id)}
          >
            {a.rotulo}
          </button>
        ))}
      </nav>

      <main className={styles.conteudo}>
        {aba === 'sobre' && <SobreTema tema={tema} />}

        {aba === 'formulario' && (
          <Formulario
            tema={tema}
            aoEnviar={() => setVersao((v) => v + 1)}
          />
        )}

        {aba === 'resultados' && (
          <Resultados tema={tema} versao={versao} />
        )}
      </main>
    </div>
  );
}
