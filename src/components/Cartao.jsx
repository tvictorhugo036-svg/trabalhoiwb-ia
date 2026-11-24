import styles from './Cartao.module.css';

// Componente reutilizado nas três telas. Recebe props com desestruturação.
export default function Cartao({ titulo, children }) {
  return (
    <section className={styles.cartao}>
      {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
      {children}
    </section>
  );
}
