import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  expCurrent: number;
  completedChallenges: number;
}

const Home = ({ level, expCurrent, completedChallenges }: HomeProps) => {
  return (
    <ChallengesProvider
      level={level}
      expCurrent={expCurrent}
      completedChallenges={completedChallenges}>
      <div className={styles.container}>
        <Head>
          <title>Home | LA</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
};

export default Home;

// SSR
// Everything in "getServerSideProps" is run in the next node.js server
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, expCurrent, completedChallenges } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      expCurrent: Number(expCurrent),
      completedChallenges: Number(completedChallenges),
    },
  };
};
