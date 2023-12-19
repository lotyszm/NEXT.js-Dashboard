import Logo from '@/../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

if (!process.env.COMPANY_NAME) {
  throw new Error('COMPANY_NAME environment variable is not set.');
}

const AuthCardLogo = () => {
  return (
    <div className="mb-0 rounded-t px-6 py-6">
      <div className="mb-3 flex flex-col items-center justify-center text-center">
        <Link href="/">
          <Image
            alt={process.env.COMPANY_NAME!}
            src={Logo}
            width={110}
            height={110}
            className="mb-0 mt-6"
          />
        </Link>
      </div>
    </div>
  );
};

export { AuthCardLogo };
