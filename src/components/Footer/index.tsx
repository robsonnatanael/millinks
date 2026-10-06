import Image from 'next/image';

const Footer = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <footer className="absolute bottom-0 flex h-12 w-full items-center">
      <div className="container mx-auto flex justify-center text-xs">
        <a
          href="https://www.robsonnatanael.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-inherit no-underline"
        >
          Desenvolvido por
          <span className="ml-2 flex">
            <Image
              src={`${basePath}/assets/images/footer/logo-robson-natanael.svg`}
              alt="logo Robson Natanael"
              width={84}
              height={17}
            />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
