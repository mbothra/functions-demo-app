import Image from 'next/image';
import styles from '../styles/About.module.css';
import { forDevs, wallets } from './data';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const About = () => {
  const github_url = process.env.NEXT_GITHUB_URL;

  return (
    <section className={styles.container}>
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          <h4 className={styles.title}>Purpose</h4>
          <p>
            This dApp will show you how to use Chainlink Functions to bring web2 data on-chain
            and use this data in your smart contracts.
          </p>
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>Getting Started</h4>
          <ol className={styles.get_started}>
            <li className={styles.list}>
              1. Install & connect a wallet
              <div className={styles.wallets}>
                {wallets.map(({ name, extension, link }, walletIndex) => (
                  <Link href={link} target="_blank" key={walletIndex}>
                    <Image
                      src={`/logos/${name}${extension}`}
                      width={24}
                      height={24}
                      alt={`${name} logo`}
                    />
                  </Link>
                ))}
              </div>
            </li>
            <li className={styles.list}>
              2. On load, the game will automatically fetch a word through chainlink functions
            </li>
            <li className={styles.list}>3. Define the metric by which you will donate (Stars or Forks)</li>
            <li className={styles.list}>4. Enter the threshold number</li>
            <li className={styles.list}>
              5. Reset word to reinitiate a call through chainlink functions to reset the board and get a new word through random words api
            </li>
          </ol>
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>For Developers</h4>

          <p style={{    color: 'black' /* text-gray-300 */}}>
            This dApp is built using Chainlink Functions. It enables developers
            to use web2 data in web3 smart contracts. Learn
            how to build a full-stack dApp with Chainlink Functions.
          </p>

          <Link
            href={github_url || '#'}
            target="_blank"
            className={styles.github_wrapper}
          >
            <Image
              src="/logos/github.svg"
              alt="github logo"
              width={24}
              height={24}
            />
            <span>View on GitHub</span>
            {/* <ArrowLongRightIcon className="w-1 h-1" /> */}
          </Link>

          <ul className={styles.for_devs}>
            {forDevs.map(({ text, link }, index) => (
              <li key={index}>
                <Link href={link} target="_blank">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;