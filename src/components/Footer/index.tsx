import Image from 'next/image';
import Container from '@material-ui/core/Container';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container className={classes.containerFooter}>
        <a
          href="https://www.robsonnatanael.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Desenvolvido por
          <Image
            src="/assets/images/footer/logo-robson-natanael.svg"
            alt="logo Robson Natanael"
            width={84}
            height={17}
          />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
